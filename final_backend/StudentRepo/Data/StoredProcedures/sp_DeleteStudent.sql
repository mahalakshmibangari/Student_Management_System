
CREATE OR ALTER PROCEDURE dbo.sp_DeleteStudent
    @Id INT
AS
BEGIN
    DELETE FROM Students
    WHERE Id = @Id;
END

 