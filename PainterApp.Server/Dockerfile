# One image serves the website and the API. Build from the repository root:
#   docker build -f PainterApp.Server/Dockerfile -t painter-app .

# 1) Build the React site
FROM node:22-alpine AS web
WORKDIR /web
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# 2) Build the API (the website is added in the final stage)
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY PainterApp.Server/PainterApp.Server.csproj PainterApp.Server/
COPY database/ database/
RUN dotnet restore PainterApp.Server/PainterApp.Server.csproj
COPY PainterApp.Server/ PainterApp.Server/
RUN dotnet publish PainterApp.Server/PainterApp.Server.csproj -c Release -o /app --no-restore -p:SkipFrontendBuild=true

# 3) Run
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app .
COPY --from=web /web/dist ./wwwroot
ENV ASPNETCORE_HTTP_PORTS=8080
EXPOSE 8080
ENTRYPOINT ["dotnet", "PainterApp.Server.dll"]
