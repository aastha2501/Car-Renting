using DAL.Model;
using DAL.Repository;
using Microsoft.AspNetCore.Identity;
using Shared.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BAL.Services.Implementation
{
    public class ProductService : IProductService
    {
        private readonly IGenericRepository<Car> _carRepository = null;

        public ProductService(IGenericRepository<Car> carRepository)
        {
            _carRepository = carRepository;

        }

        public async Task<Car> Add(ProductRequestModel model)
        {
            try
            {
                var product = new Car()
                {
                    Id = Guid.NewGuid(),
                    Model = model.CarModel,
                    Description = model.Description,
                    PricePerHour = model.PricePerHour,
                    Brand = model.Brand,
                    Image = model.ImageName,
                    ImageUrl = model.ImagePath
                };
                await _carRepository.AddAsync(product);
                return product;
            }
            catch (Exception ex) { throw ex; }
        }

        public async Task<IEnumerable<Car>> GetAll()
        {
            try
            {
                var res = _carRepository.GetAll();
                return res;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Guid> Delete(Guid id)
        {
            try
            {
                var product = _carRepository.GetAll().FirstOrDefault(x => x.Id == id);
                if (product != null)
                {
                    await _carRepository.DeleteAsync(product);
                    return id;
                }
                throw new Exception("No product found with this Id");
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
