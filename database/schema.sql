-- Run once against your SQL Server / LocalDB instance.
IF DB_ID(N'PainterApp') IS NULL CREATE DATABASE PainterApp;
GO
USE PainterApp;
GO
IF OBJECT_ID(N'dbo.Users') IS NULL
CREATE TABLE dbo.Users (
    Id           INT IDENTITY(1,1) PRIMARY KEY,
    Email        NVARCHAR(256) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(200) NOT NULL
);
IF OBJECT_ID(N'dbo.Services') IS NULL
CREATE TABLE dbo.Services (
    Id          INT IDENTITY(1,1) PRIMARY KEY,
    Title       NVARCHAR(200)  NOT NULL,
    Description NVARCHAR(2000) NOT NULL,
    Price       DECIMAL(18,2)  NOT NULL DEFAULT 0
);
IF OBJECT_ID(N'dbo.Projects') IS NULL
CREATE TABLE dbo.Projects (
    Id          INT IDENTITY(1,1) PRIMARY KEY,
    Title       NVARCHAR(200)  NOT NULL,
    ImageUrl    NVARCHAR(1000) NOT NULL,
    Description NVARCHAR(2000) NOT NULL
);
IF OBJECT_ID(N'dbo.Contacts') IS NULL
CREATE TABLE dbo.Contacts (
    Id        INT IDENTITY(1,1) PRIMARY KEY,
    Name      NVARCHAR(100)  NOT NULL,
    Email     NVARCHAR(256)  NOT NULL,
    Message   NVARCHAR(2000) NOT NULL,
    CreatedAt DATETIME2      NOT NULL DEFAULT SYSUTCDATETIME()
);
GO
