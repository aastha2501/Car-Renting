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
        Task<Car> AddCar(ProductRequestModel model);
        Task<IEnumerable<ProductResponseModel>> GetAll();
        Task<Guid> DeleteCar(Guid id);
        Task<Brand> AddBrand(BrandRequestModel model);
        Task<ProductResponseModel> GetCarById(Guid id);
        Task<IEnumerable<Brand>> GetAllBrands();
        Task<Car> EditCarDetails(Guid id, ProductRequestModel model);
        Task<IEnumerable<Car>> SearchByBrand(Guid id);
        Task<BookedCar> BookingCar(BookingCarRequestModel model, string userId);
        Task<IEnumerable<ProductResponseModel>> FindAvailability(FindCarModel model);
        Task<IEnumerable<UserBookingsResponseModel>> GetAllBookingsOfAUser(string userId);
        
    }
}
