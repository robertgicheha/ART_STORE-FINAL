-- add to orders from cart and remove from cart simultaneously--

CREATE proc spAddFromCart(@uId Varchar(100))
as
BEGIN
    insert into Orders (productId, userId)
    select productId, userId from Cart
    where userId = @uId
END
BEGIN
    DELETE FROM Cart 
    WHERE userId = @uId
END
GO
