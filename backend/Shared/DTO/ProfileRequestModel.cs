using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.DTO
{
    public class ProfileRequestModel
    {
        public string Email { get; set; }   
        public string FirstName { get; set; }   
        public string? LastName { get; set; }    
        public IFormFile? Image { get; set; }
        public string? ImagePath { get; set; }
    }
}
