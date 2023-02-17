CREATE PROC spGetOrderById(@oId varchar(255))
AS
BEGIN
    SELECT * FROM Orders
    WHERE @oId = orderId
END
