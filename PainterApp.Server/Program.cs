using System.Data;
using System.Text;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Data.SqlClient;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi;
using PainterApp.Server.Application.Handlers.CommandHandlers;
using PainterApp.Server.Common.Interfaces;
using PainterApp.Server.Common.Middleware;
using PainterApp.Server.Infrastructure.Db;
using PainterApp.Server.Infrastructure.Repositories;
using PainterApp.Server.Infrastructure.Services;

var builder = WebApplication.CreateBuilder(args);

// Aspire: telemetry, health checks, service discovery
builder.AddServiceDefaults();

#region Controllers
builder.Services.AddControllers();
#endregion

#region MediatR
builder.Services.AddMediatR(cfg =>
{
    cfg.RegisterServicesFromAssembly(typeof(CreateServiceHandler).Assembly);
});
#endregion

#region DI - Repositories & Services
builder.Services.AddScoped<IServiceRepository, ServiceRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IJwtService, JwtService>();
builder.Services.AddScoped<IProjectRepository, ProjectRepository>();
builder.Services.AddScoped<IContactRepository, ContactRepository>();
#endregion

#region DB Connection (Dapper)
var connectionString = builder.Configuration.GetConnectionString("Default")
    ?? throw new InvalidOperationException("ConnectionStrings:Default is not configured.");

builder.Services.AddScoped<IDbConnection>(_ => new SqlConnection(connectionString));
#endregion

#region JWT Authentication
var jwtKey = builder.Configuration["Jwt:Key"]
    ?? throw new InvalidOperationException("Jwt:Key is not configured (use user-secrets or an environment variable).");

if (Encoding.UTF8.GetByteCount(jwtKey) < 32)
    throw new InvalidOperationException("Jwt:Key must be at least 32 bytes long for HS256.");

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,

            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
        };
    });
builder.Services.AddAuthorization();
#endregion

#region CORS
var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() ?? [];

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        // Entries may use a wildcard subdomain, e.g. "https://*.vercel.app" for preview deployments.
        if (allowedOrigins.Length > 0)
            policy.WithOrigins(allowedOrigins)
                  .SetIsOriginAllowedToAllowWildcardSubdomains()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
    });
});
#endregion

#region Swagger
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Painter API",
        Version = "v1"
    });

    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Paste the JWT token (Swagger adds the 'Bearer' prefix)."
    });

    options.AddSecurityRequirement(document => new OpenApiSecurityRequirement
    {
        [new OpenApiSecuritySchemeReference("Bearer", document)] = []
    });
});
#endregion

var app = builder.Build();

// Optional: create/upgrade tables and the first admin on start-up (hosted environments)
await DatabaseInitializer.RunAsync(app.Configuration, app.Logger);

#region Middleware Pipeline
app.UseMiddleware<ExceptionMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Painter API V1");
        c.RoutePrefix = "swagger";
    });
}

// Serve the built website (wwwroot) from the same app as the API.
app.Use(async (context, next) =>
{
    context.Response.Headers["X-Content-Type-Options"] = "nosniff";
    context.Response.Headers["Referrer-Policy"] = "strict-origin-when-cross-origin";
    await next();
});

app.UseDefaultFiles();
app.UseStaticFiles(new StaticFileOptions
{
    OnPrepareResponse = ctx =>
    {
        // Vite fingerprints everything under /assets, so it can be cached for a year;
        // the HTML shell must always be re-checked so new deployments show up.
        var isAsset = ctx.Context.Request.Path.StartsWithSegments("/assets");
        ctx.Context.Response.Headers.CacheControl = isAsset
            ? "public,max-age=31536000,immutable"
            : "no-cache";
    }
});

app.UseCors();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Lightweight liveness probe for hosting platforms (always on)
app.MapGet("/healthz", () => Results.Ok(new { status = "ok" }));
app.MapDefaultEndpoints();
#endregion

app.Run();
