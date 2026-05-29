CREATE OR ALTER PROCEDURE sp_GetAllBranches
AS
BEGIN
    SELECT Id, Name
    FROM Branches
END
 