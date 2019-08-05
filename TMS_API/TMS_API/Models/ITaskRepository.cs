using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TMS_API.Models
{
    public interface ITaskRepository
    {
        Task<IList<UserTask>> Get();
        Task<UserTask> Get(int id);
        Task<UserTask> InsertTask(UserTask userTask);
        Task<UserTask> UpdateTask(UserTask userTask, int id);
    }
}
