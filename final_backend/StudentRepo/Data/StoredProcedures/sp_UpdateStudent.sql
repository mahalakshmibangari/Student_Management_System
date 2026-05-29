CREATE OR ALTER PROCEDURE sp_UpdateStudent
    @Id INT,
    @Name NVARCHAR(100) = NULL,
    @Course NVARCHAR(100) = NULL,
    @RollNumber NVARCHAR(100)=NULL
AS
BEGIN
    UPDATE Students
    SET Name = ISNULL(@Name, Name),
        Course = ISNULL(@Course, Course),
        RollNumber=ISNULL(@ROllNumber,RollNumber)
    WHERE Id = @Id
END