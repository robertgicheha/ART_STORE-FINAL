CREATE PROCEDURE deactiveusers(@email VARCHAR(300)) 
AS
BEGIN

	UPDATE Users SET isActive = 1 WHERE Email = @email 
END