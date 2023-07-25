using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.DTO
{
    public class ProfileResponseModel
    {
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string? LastName { get; set; }
        public string ImagePath { get; set; }
    }
}
