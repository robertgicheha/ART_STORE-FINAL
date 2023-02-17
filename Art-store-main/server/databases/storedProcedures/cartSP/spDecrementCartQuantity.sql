CREATE OR ALTER PROCEDURE spDecrementCartQuantity
    @productId VARCHAR(255),
    @userId VARCHAR(255)
AS
BEGIN
    UPDATE Cart
    SET quantity = quantity - 1
    WHERE productId = @productId AND userId = @userId AND quantity >= 1;
    IF (SELECT quantity FROM Cart WHERE productId = @productId AND userId = @userId) = 0
    BEGIN
        DELETE FROM Cart WHERE productId = @productId AND userId = @userId;
    END
END
