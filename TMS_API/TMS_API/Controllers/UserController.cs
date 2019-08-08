using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TMS_API.Dtos;
using TMS_API.Models;

namespace TMS_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IAuthRepository _authRepoasitory;

        public UserController(IUserRepository userRepository,IAuthRepository authRepository)
        {
            _userRepository = userRepository;
            _authRepoasitory = authRepository;
        }
        [Authorize(Roles = "admin")]
        [HttpGet]
        public async Task<IEnumerable<User>> Get()
        {
            return await _userRepository.Get();
        }
        //[Authorize(Roles = "admin")]
        [HttpGet("GetUserListTypeUser")]
        public async Task<IEnumerable<User>> GetUserListTypeUser()
        {
            return await _userRepository.GetUserListTypeUser();
        }
        [Authorize(Roles = "admin")]
        [HttpPost]
        public async Task<ActionResult<User>> Post([FromBody] UserForRegisterDto userForRegisterDto)
        {
            userForRegisterDto.Email = userForRegisterDto.Email.ToLower();
            if (!await _authRepoasitory.UserExists(userForRegisterDto.Email))
                return BadRequest("Username is Already Exist");
            var userToCreate = new User
            {
                FirstName = userForRegisterDto.FirstName,
                LastName = userForRegisterDto.LastName,
                Email = userForRegisterDto.Email,
                Mobile = userForRegisterDto.Mobile,
                Address = userForRegisterDto.Address,
                UserRole = "user"
            };
            var createdUser = await _authRepoasitory.Register(userToCreate, userForRegisterDto.Password);
            return createdUser;
        }
    }
}