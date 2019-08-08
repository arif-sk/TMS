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
    public class TaskController : ControllerBase
    {
        private readonly ITaskRepository _taskRepository;
        private readonly IUserRepository _userRepository;

        public TaskController(ITaskRepository taskRepository,IUserRepository userRepository)
        {
            _taskRepository = taskRepository;
            _userRepository = userRepository;
        }
        [Authorize(Roles = "admin")]
        [HttpGet]
        public async Task<IEnumerable<TaskUserViewModel>> Get()
        {
            return await _taskRepository.Get();
        }
        [Authorize(Roles = "admin")]
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskUserViewModel>> Get(int id)
        {
            var task = await _taskRepository.Get(id);
            if (task == null)
                return BadRequest();
            return task;
        }
        [Authorize(Roles = "admin")]
        [HttpPost]
        public async Task<ActionResult<UserTask>> Post([FromBody] UserTask userTask)
        {
            if (userTask == null || !ModelState.IsValid)
                return BadRequest();
            var addedUserTask = await _taskRepository.InsertTask(userTask);
            return addedUserTask;
        }
        [Authorize(Roles = "admin")]
        [HttpPut]
        [Route("UpdateTask/{id}")]
        public async Task<ActionResult<UserTask>> UpdateTask(int id, [FromBody] UserTask userTask)
        {
            if (id > 0 && userTask == null)
                return BadRequest();
            var updatedTask = await _taskRepository.UpdateTask(id, userTask);
            if (updatedTask == null)
                return NotFound();
            return updatedTask;
        }
        [Authorize(Roles = "admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> Delete(int id)
        {
            var task = await _taskRepository.GetTask(id);
            if (task == null)
                return BadRequest();
            var dlt = _taskRepository.Delete(task);
            if (dlt)
                return true;
            return false;
        }
        [Authorize(Roles = "user")]
        [Route("GetAssignedTaskToSpecificUser/{id}")]
        [HttpGet]
        public async Task<IEnumerable<UserTask>> GetAssignedTaskToSpecificUser(int id)
        {
            var result =  await _taskRepository.GetAssignedTaskToSpecificUser(id);
            return result.ToList();
        }

    }
}