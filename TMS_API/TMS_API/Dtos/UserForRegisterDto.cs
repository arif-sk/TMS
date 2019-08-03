using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TMS_API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        [StringLength(20,MinimumLength = 3, ErrorMessage = "password must be between 3 to 20 characters")]
        public string Password { get; set; }
        [Required]
        public string Mobile { get; set; }
        [Required]
        public string Address { get; set; }

    }
}
