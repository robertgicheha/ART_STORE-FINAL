CREATE PROC spGetOrderByUserId(@uId varchar(255))
AS
BEGIN
    SELECT * FROM Orders
    WHERE @uId = userId
END