using System.Data;
using System.Text;
//using Microsoft.OpenApi.Models;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Data.SqlClient;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi;
//using Microsoft.OpenApi.Models;
using PainterApp.Server.Application.Handlers.CommandHandlers;
using PainterApp.Server.Common.Interfaces;
using PainterApp.Server.Common.Middleware;
using PainterApp.Server.Infrastructure.Repositories;
using PainterApp.Server.Infrastructure.Services;

var builder = WebApplication.CreateBuilder(args);

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
builder.Services.AddScoped<IDbConnection>(sp =>
    new SqlConnection(builder.Configuration.GetConnectionString("Default")));
#endregion

#region JWT Authentication
var key = Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]);

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
            IssuerSigningKey = new SymmetricSecurityKey(key)
        };
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

    // JWT Authorization in Swagger
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Enter: Bearer {your token}"
    });

    //options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    //{
    //    Name = "Authorization",
    //    Type = SecuritySchemeType.Http,
    //    Scheme = "bearer",
    //    BearerFormat = "JWT",
    //    In = ParameterLocation.Header,
    //    Description = "Enter JWT token like: Bearer {your token}"
    //});

//    options.AddSecurityRequirement(new OpenApiSecurityRequirement
//{
//    {
//        new OpenApiSecurityScheme
//        {
//            Reference = new OpenApiReference
//            {
//                Type = ReferenceType.SecurityScheme,
//                Id = "Bearer"
//            }
//        },
//        Array.Empty<string>()
//    }
//});
});
#endregion

#region App Build
var app = builder.Build();
#endregion

#region Middleware Pipeline

// Global Exception Middleware (VERY IMPORTANT)
app.UseMiddleware<ExceptionMiddleware>();

// Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Painter API V1");
        c.RoutePrefix = "swagger";
    });
}

app.UseStaticFiles();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

#endregion

app.Run();
//using System.Data;
//using System.Data.SqlClient;
//using Microsoft.OpenApi.Models;
//using System.Text;
//using MediatR;
//using Microsoft.AspNetCore.Authentication.JwtBearer;
//using Microsoft.Data.SqlClient;
//using Microsoft.IdentityModel.Tokens;
//using PainterApp.Server.Application.Handlers.CommandHandlers;
//using PainterApp.Server.Common.Interfaces;
//using PainterApp.Server.Common.Middleware;
//using PainterApp.Server.Infrastructure.Repositories;
//using PainterApp.Server.Infrastructure.Services;

//var builder = WebApplication.CreateBuilder(args);

//// ✅ Add Controllers
//builder.Services.AddControllers();

//// ✅ MediatR
//builder.Services.AddMediatR(cfg =>
//{
//    cfg.RegisterServicesFromAssembly(typeof(Program).Assembly);
//});

//// ✅ Repositories & Services
//builder.Services.AddScoped<IServiceRepository, ServiceRepository>();
//builder.Services.AddScoped<IUserRepository, UserRepository>();
//builder.Services.AddScoped<IJwtService, JwtService>();
//builder.Services.AddEndpointsApiExplorer();

//builder.Services.AddSwaggerGen(options =>
//{
//    options.SwaggerDoc("v1", new()
//    {
//        Title = "Painter API",
//        Version = "v1"
//    });

//    // 🔐 JWT Support in Swagger
//    options.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
//    {
//        Name = "Authorization",
//        Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
//        Scheme = "bearer",
//        BearerFormat = "JWT",
//        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
//        Description = "Enter: Bearer {your JWT token}"
//    });

//    options.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
//    {
//        {
//            new Microsoft.OpenApi.Models.OpenApiSecurityScheme
//            {
//                Reference = new Microsoft.OpenApi.Models.OpenApiReference
//                {
//                    Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
//                    Id = "Bearer"
//                }
//            },
//            new string[] {}
//        }
//    });
//});
//// ✅ DB Connection
//builder.Services.AddScoped<IDbConnection>(sp =>
//    new System.Data.SqlClient.SqlConnection(builder.Configuration.GetConnectionString("Default")));

//// ✅ JWT Configuration
//var key = Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]);

//builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//    .AddJwtBearer(options =>
//    {
//        options.TokenValidationParameters = new TokenValidationParameters
//        {
//            ValidateIssuer = true,
//            ValidateAudience = true,
//            ValidateLifetime = true,
//            ValidateIssuerSigningKey = true,

//            ValidIssuer = builder.Configuration["Jwt:Issuer"],
//            ValidAudience = builder.Configuration["Jwt:Audience"],

//            IssuerSigningKey = new SymmetricSecurityKey(key)
//        };
//    });

//// Aspire defaults
//builder.AddServiceDefaults();

//builder.Services.AddProblemDetails();
//builder.Services.AddOpenApi();

//var app = builder.Build();

//// 🔥 Middleware Order (IMPORTANT)
//app.UseMiddleware<ExceptionMiddleware>();

//if (app.Environment.IsDevelopment())
//{
//    app.MapOpenApi();
//}

//app.UseStaticFiles();

//// ✅ ADD THESE (CRITICAL)
//app.UseAuthentication();
//app.UseAuthorization();

//// ✅ Map Controllers
//app.MapControllers();

//app.MapDefaultEndpoints();

//app.Run();