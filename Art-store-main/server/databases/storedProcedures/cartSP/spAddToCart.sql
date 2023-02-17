-- add or increment quantity if exists
CREATE OR ALTER PROCEDURE spAddToCart(@pId VARCHAR(255), @uId VARCHAR(255), @quantity AS INT = 1)
AS
BEGIN
MERGE Cart AS target
USING (VALUES (@pId, @uId, @quantity)) AS source (productId, userId, quantity)
ON target.productId = source.productId AND target.userId = source.userId
WHEN MATCHED THEN
    UPDATE SET target.quantity = target.quantity + source.quantity
    WHEN NOT MATCHED THEN
    INSERT (productId, userId, quantity)
    VALUES (source.productId, source.userId, source.quantity);
END
