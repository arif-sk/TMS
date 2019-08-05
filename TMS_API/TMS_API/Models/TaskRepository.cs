using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TMS_API.Data;

namespace TMS_API.Models
{
    public class TaskRepository : ITaskRepository
    {
        private readonly TmsDbContext _tmsDbContext;

        public TaskRepository(TmsDbContext tmsDbContext)
        {
            _tmsDbContext = tmsDbContext;
        }
        public async Task<IList<UserTask>> Get()
        {
            return await _tmsDbContext.Tasks.ToListAsync();
        }

        public async Task<UserTask> Get(int id)
        {
            var task =  await _tmsDbContext.Tasks.FirstOrDefaultAsync(x => x.Id == id);
            return task;
        }

        public async Task<UserTask> InsertTask(UserTask userTask)
        {
            await _tmsDbContext.AddAsync(userTask);
            await _tmsDbContext.SaveChangesAsync();
            return userTask;
        }

        public async Task<UserTask> UpdateTask(UserTask userTask, int id)
        {
            var targetedTask = await _tmsDbContext.Tasks.FirstOrDefaultAsync(x => x.Id == id);
            if (targetedTask != null)
            {
                targetedTask.Name = userTask.Name;
                targetedTask.Description = userTask.Description;
                targetedTask.StartDate = userTask.StartDate;
                targetedTask.EndDate = userTask.EndDate;
                targetedTask.AssignedTo = userTask.AssignedTo;
                _tmsDbContext.Attach(targetedTask);
                await _tmsDbContext.SaveChangesAsync();
                return targetedTask;
            }
            return null;
        }
    }
}
