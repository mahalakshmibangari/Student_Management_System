using Microsoft.EntityFrameworkCore;
using Studentrepo.Data;
using Studentrepo.DTO;
using Studentrepo.Exceptions;

namespace Studentrepo.Manager
{
    public class Studentmng : IStdManager
    {
        private readonly StudentDbContext _context;

        public Studentmng(StudentDbContext context)
        {
            _context = context;
        }

        public async Task CreateStudent(Student student)
        {
            try
            {
                await _context.Database.ExecuteSqlInterpolatedAsync(
                    $"EXEC sp_CreateStudent @Name={student.Name}, @Course={student.Course},@RollNumber={student.RollNumber} ");
            }

            catch (Exception ex)
            {
                throw new Exception($"Error while creating student: {ex.Message}");
            }
        }

        public async Task UpdateStudent(Student student)
        {
            try
            {
                await _context.Database.ExecuteSqlInterpolatedAsync(
    $"EXEC sp_UpdateStudent @Id={student.Id}, @Name={student.Name}, @Course={student.Course},@RollNumber={student.RollNumber}");

            }
            catch (Exception ex)
            {
                throw new Exception($"Error while updating student: {ex.Message}");
            }
        }

        public async Task DeleteStudent(int id)
        {
            try
            {
                await _context.Database.ExecuteSqlInterpolatedAsync(
                    $"EXEC sp_DeleteStudent @Id={id}");
            }
            catch (Exception ex)
            {
                throw new Exception($"Error while deleting student: {ex.Message}");
            }
        }

        public async Task<Student> GetStudentById(int id)
        {
            try
            {
                var student = (await _context.Students
                    .FromSqlInterpolated($"EXEC dbo.sp_GetStudentById @Id = {id}")
                    .AsNoTracking()
                    .ToListAsync())
                    .FirstOrDefault();

                if (student == null)
                {
                    throw new StudentNotFoundException(id);
                }

                return student;
            }
            catch (StudentNotFoundException)
            {
                throw;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error while fetching student: {ex.Message}");
            }
        }

        public async Task<List<Student>> GetAllStudent()
        {
            try
            {
                return await _context.Students
                    .FromSqlInterpolated($"EXEC sp_GetAllStudents")
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception($"Error while fetching students: {ex.Message}");
            }
        }

        public async Task<List<Branch>> GetAllBranches()
        {
            try
            {
                return await _context.Branches
                    .FromSqlInterpolated($"EXEC sp_GetAllBranches")
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception($"Error while fetching branches: {ex.Message}");
            }
        }
    }
}
