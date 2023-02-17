CREATE PROCEDURE spGetSingleProduct(@id VARCHAR(100))
AS
BEGIN
SELECT * FROM Products WHERE productId = @id
END
GO