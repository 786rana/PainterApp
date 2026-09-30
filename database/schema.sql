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

-- ---- Migration: bilingual services with image, category and order ----
IF COL_LENGTH('dbo.Services', 'TitleAr') IS NULL
    ALTER TABLE dbo.Services ADD TitleAr NVARCHAR(200) NOT NULL CONSTRAINT DF_Services_TitleAr DEFAULT N'';
IF COL_LENGTH('dbo.Services', 'DescriptionAr') IS NULL
    ALTER TABLE dbo.Services ADD DescriptionAr NVARCHAR(2000) NOT NULL CONSTRAINT DF_Services_DescriptionAr DEFAULT N'';
IF COL_LENGTH('dbo.Services', 'ImageUrl') IS NULL
    ALTER TABLE dbo.Services ADD ImageUrl NVARCHAR(1000) NOT NULL CONSTRAINT DF_Services_ImageUrl DEFAULT N'';
IF COL_LENGTH('dbo.Services', 'Category') IS NULL
    ALTER TABLE dbo.Services ADD Category NVARCHAR(50) NOT NULL CONSTRAINT DF_Services_Category DEFAULT N'painting';
IF COL_LENGTH('dbo.Services', 'SortOrder') IS NULL
    ALTER TABLE dbo.Services ADD SortOrder INT NOT NULL CONSTRAINT DF_Services_SortOrder DEFAULT 0;
GO
