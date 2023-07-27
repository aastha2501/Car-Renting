using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.DTO
{
    public class BrandDetails
    {
        public string Name { get; set; }
        public List<ProductRequestModel> Products { get; set; }
    }
}
