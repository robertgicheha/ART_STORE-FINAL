CREATE PROCEDURE spUpdateOrderStatus(@oId VARCHAR(255), @status VARCHAR(255))
AS
BEGIN
    UPDATE Orders
    SET orderStatus = @status
    WHERE OrderId = @oId
END
GO
