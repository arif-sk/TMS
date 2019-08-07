using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using TMS_API.Dtos;
using TMS_API.Models;

namespace TMS_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _authRepsitory;
        private readonly IConfiguration _conf;

        public AuthController(IAuthRepository authRepository,IConfiguration conf)
        {
            _authRepsitory = authRepository;
            _conf = conf;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            userForRegisterDto.Email = userForRegisterDto.Email.ToLower();
            if (!await _authRepsitory.UserExists(userForRegisterDto.Email))
                return BadRequest("Username is Already Exist");
            var userToCreate = new User
            {
                FirstName = userForRegisterDto.FirstName,
                LastName = userForRegisterDto.LastName,
                Email = userForRegisterDto.Email,
                Mobile = userForRegisterDto.Mobile,
                Address = userForRegisterDto.Address,
                UserRole = "admin"

            };
            var createdUser = await _authRepsitory.Register(userToCreate, userForRegisterDto.Password);
            return StatusCode(201);
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDtos)
        {
            var user = await _authRepsitory.Login(userForLoginDtos.email, userForLoginDtos.password);
            if (user == null)
                return Unauthorized();
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()),
                new Claim(ClaimTypes.Name,user.Email),
                new Claim(ClaimTypes.Role, user.UserRole),
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8
                            .GetBytes(_conf.GetSection("AppSettings:Token").Value));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return Ok(new
            {
                token = tokenHandler.WriteToken(token)
            });
        }
    }
}