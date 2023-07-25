using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.DTO
{
    public class ProductRequestModel
    {
        public string CarModel { get; set; }
        public string Brand { get; set; }
        [DefaultValue(0)]
        public decimal PricePerHour { get; set; }
        public string? Description { get; set; }
        public IFormFile? Image { get; set; }
        public string? ImageName { get; set; }  
        public string? ImagePath{ get; set; }
    }
}
