using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Studentrepo.DTO;
using Studentrepo.Exceptions;
using Studentrepo.Manager;

namespace StudentRepository.Controllers

{
    [ApiController]

    [Route("[controller]")]

    public class StudentController : ControllerBase

    {

        private readonly IStdManager _studentManager;


        public StudentController(IStdManager studentManager)

        {

            _studentManager = studentManager;

        }
        
      // [Authorize]

        [HttpGet]

        [Route("getall")]

        public async Task<IActionResult> GetAllStudents()

        {

            try
            {

                var students = await _studentManager.GetAllStudent();

                return Ok(students);

            }

            catch (Exception ex)

            {

                return StatusCode(500, new { message = ex.Message });

            }

        }

       //[Authorize]

        [HttpGet]

        [Route("getbyId")]

        public async Task<IActionResult> GetStudent(int Id)

        {

            try
            {

                var student = await _studentManager.GetStudentById(Id);

                return Ok(student);

            }

            catch (StudentNotFoundException ex)

            {

                return NotFound(new { message = ex.Message });

            }

            catch (Exception ex)

            {

                return StatusCode(500, new { message = ex.Message });

            }

        }

       //[Authorize(Roles = "Admin")]

        [HttpPost]

        [Route("create")]

        public async Task<IActionResult> CreateStudent([FromBody] Student student)

        {

            try
            {

                await _studentManager.CreateStudent(student);

                return Ok(new { message = "Student created successfully" });

            }



            catch (Exception ex)

            {

                return StatusCode(500, new { message = ex.Message });

            }

        }

        //[Authorize(Roles = "Admin")]

        [HttpPut]

        [Route("update")]

        public async Task<IActionResult> UpdateStudent([FromBody] Student student)

        {

            try
            {

                await _studentManager.UpdateStudent(student);

                return Ok(new { message = "Student updated successfully" });

            }

            catch (Exception ex)

            {

                return StatusCode(500, new { message = ex.Message });

            }

        }

       // [Authorize(Roles = "Admin")]

        [HttpDelete]

        [Route("delete")]

        public async Task<IActionResult> DeleteStudent(int Id)

        {

            try
            {

                await _studentManager.DeleteStudent(Id);

                return Ok(new { message = "Student deleted successfully" });

            }

            catch (Exception ex)

            {

                return StatusCode(500, new { message = ex.Message });

            }

        }

        //[Authorize]

        [HttpGet]

        [Route("getallbranches")]

        public async Task<IActionResult> GetAllBranches()

        {

            try
            {

                var branches = await _studentManager.GetAllBranches();

                return Ok(branches);

            }

            catch (Exception ex)

            {

                return StatusCode(500, new { message = ex.Message });

            }

        }

    }

}