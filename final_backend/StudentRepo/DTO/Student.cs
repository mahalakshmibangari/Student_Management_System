using System;
using System.ComponentModel.DataAnnotations;

namespace Studentrepo.DTO

{
    public class Student
    {

        [Key]

        public int Id { get; set; }


        [MaxLength(100)]

        public string? Name { get; set; }


        [MaxLength(50)]

        public string? Course { get; set; }
        [MaxLength(100)]
        public string? RollNumber { get; set; }
    }

}