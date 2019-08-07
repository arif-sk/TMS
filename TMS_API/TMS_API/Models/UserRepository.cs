﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TMS_API.Data;

namespace TMS_API.Models
{
    public class UserRepository : IUserRepository
    {
        private readonly TmsDbContext _tmsDbComtext;

        public UserRepository(TmsDbContext tmsDbContext)
        {
            _tmsDbComtext = tmsDbContext;
        }
        public async Task<IList<User>> Get()
        {
            return await _tmsDbComtext.Users.ToListAsync();
        }
    }
}