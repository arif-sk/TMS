using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TMS_API.Models;

namespace TMS_API.Data
{
    public class TmsDbContext:DbContext
    {
        public TmsDbContext(DbContextOptions<TmsDbContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
    }
}
