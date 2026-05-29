using Microsoft.EntityFrameworkCore;
using Studentrepo.Data;

public static class DbInitializer
{

    public static void Initialize(StudentDbContext context)

    {

        context.Database.Migrate();

        ExecuteStoredProcedures(context);

    }


    private static void ExecuteStoredProcedures(StudentDbContext context)

    {

        var directory = new DirectoryInfo("Data/StoredProcedures");


        foreach (var file in directory.GetFiles("*.sql").OrderBy(f => f.Name))

        {

            var sql = File.ReadAllText(file.FullName);

            context.Database.ExecuteSqlRaw(sql);

        }

    }

}