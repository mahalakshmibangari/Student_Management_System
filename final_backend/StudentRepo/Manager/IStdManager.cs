using Studentrepo.DTO;
using System.Collections.Generic;

namespace Studentrepo.Manager

{
    public interface IStdManager
    {
        Task CreateStudent(Student student);
        Task<Student> GetStudentById(int id);
        Task<List<Student>> GetAllStudent();
        Task UpdateStudent(Student student);
        Task DeleteStudent(int id);
        Task<List<Branch>> GetAllBranches();
    }
}
