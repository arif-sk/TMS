using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TMS_API.Models
{
    public interface IAuthRepository
    {
        Task<User> Login(string email, string password);
        Task<User> Register(User user, string password);
        Task<bool> UserExists(string email);
    }
}
