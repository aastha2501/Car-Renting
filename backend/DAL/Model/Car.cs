using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Model
{
    public class Car: BaseEntity   
    {
        public string Model { get; set; }
        public string Brand { get; set; }   
        public decimal PricePerHour { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public string ImageUrl { get; set; }
    }
}
