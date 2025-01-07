CREATE DATABASE productdb;
go

USE productdb;
go

CREATE TABLE dbo.products (id INT NOT NULL IDENTITY(1,1) PRIMARY KEY, name VARCHAR(100), price float, created_at DATETIME DEFAULT GETDATE());
go
