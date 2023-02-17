CREATE PROCEDURE getuserbyemail (@email VARCHAR(300) )
AS
BEGIN

	SELECT * FROM Users WHERE isActive = 0 AND Email = @email 
END