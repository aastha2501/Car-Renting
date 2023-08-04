using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.DTO
{
    public class UserBookingsResponseModel
    {
        public Guid Id { get; set; }
        public string CarModel { get; set; }
        public string Brand { get; set; }
        public decimal PricePerHour { get; set; }
        public decimal TotalPrice { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }   
        public string Image { get; set; }
        public bool IsCancelled { get; set; } 
    }
}
