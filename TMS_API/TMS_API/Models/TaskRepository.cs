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

        public bool Delete(UserTask userTask)
        {
            _tmsDbContext.Tasks.Attach(userTask);
            _tmsDbContext.Tasks.Remove(userTask);
            _tmsDbContext.SaveChanges();
            return true;
        }
        public async Task<UserTask> GetTask(int id) {
            return await _tmsDbContext.Tasks.FirstOrDefaultAsync(x => x.Id == id);
        }
        public async Task<IList<TaskUserViewModel>> Get()
        {
            return await (from t in _tmsDbContext.Tasks
                       join u in _tmsDbContext.Users on t.AssignedTo equals u.Id
                       select new TaskUserViewModel
                       {
                           Id = t.Id,
                           TaskName = t.TaskName,
                           Description = t.Description,
                           StartDate = t.StartDate,
                           EndDate = t.EndDate,
                           AssignedTo = t.AssignedTo,
                           AssignedUser = u.FirstName + " " + u.LastName
                       }).ToListAsync();
        }

        public async Task<TaskUserViewModel> Get(int id)
        {
            return await (from t in _tmsDbContext.Tasks
                          join u in _tmsDbContext.Users on t.AssignedTo equals u.Id where t.Id == id
                          select new TaskUserViewModel
                          {
                              Id = t.Id,
                              TaskName = t.TaskName,
                              Description = t.Description,
                              StartDate = t.StartDate,
                              EndDate = t.StartDate,
                              AssignedTo = t.AssignedTo,
                              AssignedUser = u.FirstName + " " + u.LastName
                          }).FirstOrDefaultAsync();
        }

        public async Task<UserTask> InsertTask(UserTask userTask)
        {
            await _tmsDbContext.AddAsync(userTask);
            await _tmsDbContext.SaveChangesAsync();
            return userTask;
        }

        public async Task<UserTask> UpdateTask(int id, UserTask userTask)
        {
            var targetedTask = await _tmsDbContext.Tasks.FirstOrDefaultAsync(x => x.Id == id);
            if (id >0 && targetedTask != null)
            {
                targetedTask.TaskName = userTask.TaskName;
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

        public async Task<IList<UserTask>> GetAssignedTaskToSpecificUser(int id)
        {
            return await _tmsDbContext.Tasks.Where(x => x.AssignedTo == id).ToListAsync();
        }
    }
}
