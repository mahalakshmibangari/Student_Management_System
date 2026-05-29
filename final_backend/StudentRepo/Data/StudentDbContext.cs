using Microsoft.EntityFrameworkCore;
using Studentrepo.DTO;

namespace Studentrepo.Data

{
    public class StudentDbContext : DbContext
    {

        public StudentDbContext(DbContextOptions<StudentDbContext> options) : base(options)

        {

        }


        public DbSet<Student> Students { get; set; }

        public DbSet<Branch> Branches { get; set; }


        public DbSet<User> Users { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)

        {

            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Student>().HasKey(s => s.Id);

        }

    }

}

