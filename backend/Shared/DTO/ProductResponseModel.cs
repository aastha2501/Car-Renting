using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.DTO
{
    public class ProductResponseModel
    {
        public string CarModel { get; set; }
        public string Brand { get; set; }
        public decimal PricePerHour { get; set; }
        public int Seats { get; set; }
        public string Image { get; set; }

    }
}
