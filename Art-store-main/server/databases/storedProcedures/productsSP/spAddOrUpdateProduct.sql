SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE OR ALTER PROCEDURE [dbo].[spAddOrUpdateProduct] (
    @id VARCHAR(100), @name VARCHAR(100)=NULL , @description VARCHAR(100) , @category VARCHAR(150), @price DECIMAL(10, 2), @imageUrl VARCHAR(255), @date DATETIME = DEFAULT)
AS
BEGIN


IF EXISTS(SELECT * FROM Products WHERE productId =@id)
BEGIN
UPDATE Products SET Name=@name, Description=@description , Category=@category , Price= @price, ImageUrl =@imageUrl, createdAt= COALESCE(@date, GETDATE())
WHERE productId=@id
END

ELSE
BEGIN
INSERT INTO Products (productId, Name, Description, Category, Price, ImageUrl)
VALUES( @id, @name, @description, @category, @price, @imageUrl)
END
END
GO