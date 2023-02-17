CREATE PROCEDURE getactiveusers
AS
BEGIN

	SELECT * FROM Users WHERE isActive = 0 
END
