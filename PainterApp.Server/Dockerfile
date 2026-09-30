# Build from the repository root:
#   docker build -f PainterApp.Server/Dockerfile -t painter-api .
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY PainterApp.Server/PainterApp.Server.csproj PainterApp.Server/
COPY database/ database/
RUN dotnet restore PainterApp.Server/PainterApp.Server.csproj
COPY PainterApp.Server/ PainterApp.Server/
RUN dotnet publish PainterApp.Server/PainterApp.Server.csproj -c Release -o /app --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app .
ENV ASPNETCORE_HTTP_PORTS=8080
EXPOSE 8080
ENTRYPOINT ["dotnet", "PainterApp.Server.dll"]
