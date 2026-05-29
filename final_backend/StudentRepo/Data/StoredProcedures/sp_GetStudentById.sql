

CREATE OR ALTER PROCEDURE dbo.sp_GetStudentById
    @Id INT
AS
BEGIN
    SELECT * 
    FROM Students
    WHERE Id = @Id;
END

 