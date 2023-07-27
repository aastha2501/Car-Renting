using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Model
{
    public class Car: BaseEntity   
    {
        public string Model { get; set; }
        public int Seats { get; set; }
        public decimal PricePerHour { get; set; }
        public string Image { get; set; }
        public string ImageUrl { get; set; }
        [ForeignKey("Brand")]
        public Guid BrandId { get; set; }
        public Brand Brand { get; set;}

    }
}
