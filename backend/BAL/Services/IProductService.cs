using DAL.Model;
using Shared.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BAL.Services
{
    public interface IProductService
    {
        Task<Car> Add(ProductRequestModel model);
        Task<IEnumerable<Car>> GetAll();
        Task<Guid> Delete(Guid id);
        Task<ProductRequestModel> GetCarById(Guid id);
    }
}
