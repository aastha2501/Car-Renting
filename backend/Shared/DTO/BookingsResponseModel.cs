using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.DTO
{
    public class BookingsResponseModel
    {
        public string UserId { get; set; }
        public Guid CarId { get; set; }
        public DateTime StartDate { get; set; } 
        public DateTime EndDate { get; set; }   

    }
}
