using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Studentrepo.Data;
using Studentrepo.DTO;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Studentrepo.Controllers

{

    [ApiController]

    [Route("[controller]")]

    public class AuthController : ControllerBase
    {

        private readonly IConfiguration _configuration;

        private readonly StudentDbContext _context;


        public AuthController(IConfiguration configuration, StudentDbContext context)

        {

            _configuration = configuration;

            _context = context;

        }


        [HttpPost]

        [Route("register")]

        public async Task<IActionResult> Register([FromBody] RegisterRequest request)

        {

            var existingUser = await _context.Users.FirstOrDefaultAsync(x =>
                x.UserName == request.UserName);


            if (existingUser != null)

            {

                return BadRequest(new
                {

                    message = "Username already exists"
                });

            }


            var user = new User
            {

                UserName = request.UserName,

                Password = request.Password,

                Role = "User"
            };


            _context.Users.Add(user);

            await _context.SaveChangesAsync();


            return Ok(new
            {

                message = "User registered successfully"
            });

        }


        [HttpPost]

        [Route("login")]

        public async Task<IActionResult> Login([FromBody] AuthRequest request)

        {

            var user = await _context.Users.FirstOrDefaultAsync(x =>
                x.UserName == request.UserName &&
                x.Password == request.Password);


            if (user == null)

            {

                return Unauthorized(new
                {

                    message = "Invalid user credentials"
                });

            }


            var jwtSettings = _configuration.GetSection("Jwt");

            // Validate configuration values to avoid possible null arguments
            var keyString = jwtSettings["Key"] ?? throw new InvalidOperationException("JWT 'Key' configuration is missing.");
            var durationString = jwtSettings["DurationInMinutes"] ?? throw new InvalidOperationException("JWT 'DurationInMinutes' configuration is missing.");
            var issuer = jwtSettings["Issuer"] ?? throw new InvalidOperationException("JWT 'Issuer' configuration is missing.");
            var audience = jwtSettings["Audience"] ?? throw new InvalidOperationException("JWT 'Audience' configuration is missing.");

            var key = Encoding.UTF8.GetBytes(keyString);

            var tokenHandler = new JwtSecurityTokenHandler();


            var tokenDescriptor = new SecurityTokenDescriptor
            {

                Subject = new ClaimsIdentity(new[]

                {

                    new Claim(ClaimTypes.Name, user.UserName),

                    new Claim(ClaimTypes.Role, user.Role),

                    new Claim("UserId", user.Id.ToString())

                }),


                Expires = DateTime.UtcNow.AddMinutes(

                    Convert.ToDouble(durationString)),


                Issuer = issuer,

                Audience = audience,


                SigningCredentials = new SigningCredentials(

                    new SymmetricSecurityKey(key),

                    SecurityAlgorithms.HmacSha256Signature)

            };


            var token = tokenHandler.CreateToken(tokenDescriptor);

            var tokenString = tokenHandler.WriteToken(token);


            return Ok(new
            {

                token = tokenString,

                username = user.UserName,

                role = user.Role,

                message = "Login successful"
            });

        }

    }

}