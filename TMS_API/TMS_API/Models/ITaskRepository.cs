﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TMS_API.Models
{
    public interface ITaskRepository
    {
        Task<IList<TaskUserViewModel>> Get();
        Task<TaskUserViewModel> Get(int id);
        Task<UserTask> InsertTask(UserTask userTask);
        Task<UserTask> UpdateTask(int id ,UserTask userTask );
        bool Delete(UserTask userTask);
        Task<UserTask> GetTask(int id);
        Task<IList<UserTask>> GetAssignedTaskToSpecificUser(int id);
    }
}
