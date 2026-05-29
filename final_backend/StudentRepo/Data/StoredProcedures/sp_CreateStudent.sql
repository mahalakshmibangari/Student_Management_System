

CREATE OR ALTER PROCEDURE dbo.sp_CreateStudent
    @Name NVARCHAR(100),
    
    @Course NVARCHAR(100),
    @RollNumber NVARCHAR(100)
AS
BEGIN
    INSERT INTO Students (Name, Course,RollNumber)
    VALUES (@Name, @Course,@RollNumber);
END

 