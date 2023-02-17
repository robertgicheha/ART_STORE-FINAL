CREATE PROCEDURE spGetProductByCategory(@category VARCHAR(100))
AS
BEGIN
SELECT * FROM Products WHERE Category = @category
END
GO