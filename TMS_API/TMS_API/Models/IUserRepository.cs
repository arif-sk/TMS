using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TMS_API.Dtos;

namespace TMS_API.Models
{
    public interface IUserRepository
    {
        Task<IList<User>> Get();
    }
}
