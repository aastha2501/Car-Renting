using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.DTO
{
    public class BookingsResponseModel
    {
        public string UserName { get; set; }
        public string Model { get; set; }
        public string Brand { get; set; }
        public string StartDate { get; set; } 
        public string EndDate { get; set; }   
        public decimal TotalRent { get; set; }

    }
}
