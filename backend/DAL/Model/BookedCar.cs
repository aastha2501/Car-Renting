using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Model
{
    public class BookedCar: BaseEntity
    {
        [ForeignKey("CarEntity")]
        public Guid CarId { get; set; }
        public Car CarEntity { get; set; }
        [ForeignKey("User")]
        public string UserId { get; set; }
        public User User { get; set; }  
        public DateTime To { get; set; }    
        public DateTime From { get; set; }
        public decimal TotalRent { get; set; }
    }
}
