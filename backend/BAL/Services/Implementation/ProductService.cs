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
        private readonly IGenericRepository<Brand> _brandRepository = null;

        public ProductService(IGenericRepository<Car> carRepository, IGenericRepository<Brand> brandRepository)
        {
            _carRepository = carRepository;
            _brandRepository = brandRepository;

        }
        public async Task<Brand> AddBrand(BrandRequestModel model)
        {
            try
            {
                var brand = new Brand()
                {
                    Id = Guid.NewGuid(),
                    Name = model.Name
                };
                await _brandRepository.AddAsync(brand);
                return brand;
            }
            catch (Exception ex) { throw ex; }
        }
        public async Task<ProductRequestModel> GetCarById(Guid id)
        {
            //repo
            try
            {
                var res = await _carRepository.GetById(id);

                if (res != null)
                {
                    var product = new ProductRequestModel()
                    {
                        //CarModel = res.Model, 
                        //Brand = res.Brand,
                        //PricePerHour = res.PricePerHour,
                        //ImagePath = res.ImageUrl
                    };
                    return product;
                } 
                else
                {
                    throw new ApplicationException("Unable to find this product");
                }
               
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
        public async Task<Car> AddCar(ProductRequestModel model)
        {
            try
            {
                var product = new Car()
                {
                    Id = Guid.NewGuid(),
                    Model = model.CarModel,
                    PricePerHour = model.PricePerHour,
                    Image = model.ImageName,
                    ImageUrl = model.ImagePath,
                    BrandId = model.BrandId,
                    Seats = model.Seats
                };
                await _carRepository.AddAsync(product);
                return product;
            }
            catch (Exception ex) { throw ex; }
        }
        public async Task<IEnumerable<Brand>> GetAllBrands()
        {
            try
            {
                var res = _brandRepository.GetAll();
                return res;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<IEnumerable<ProductResponseModel>> GetAll()
        {
            try
            {
                List<ProductResponseModel> productList = new List<ProductResponseModel>();

                var allCars = _carRepository.GetAll().ToList();
                
                foreach ( var car in allCars ) {
                    var brandName = _brandRepository.GetAll().FirstOrDefault(x => x.Id == car.BrandId).Name;

                    var productListObj = new ProductResponseModel()
                    { 
                        CarModel = car.Model,
                        Brand = brandName,
                        PricePerHour = car.PricePerHour,
                        Image = car.ImageUrl,
                        Seats = car.Seats
                    };

                    productList.Add(productListObj);
                }
                return productList;
                
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<Guid> DeleteCar(Guid id)
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
        public async Task<Car> EditCarDetails(Guid id, ProductRequestModel model)
        {
            try
            {
                var product = _carRepository.GetAll().FirstOrDefault(x => x.Id == id);

                if (product != null)
                {
                    product.Model = model.CarModel;
                    product.PricePerHour = model.PricePerHour;
                    product.BrandId = model.BrandId;
                    product.Seats = model.Seats;

                    if(model.Image != null)
                    {
                        product.Image = model.ImageName;
                        product.ImageUrl = model.ImagePath;
                    }

                    _carRepository.Save();
                    return product;

                }
                throw new ApplicationException("Unable to find this product");

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<IEnumerable<Car>> SearchByBrand(Guid id)
        {
            try
            {
                var res = _carRepository.GetAll().Where(x =>  x.BrandId == id).ToList();
                return res;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        
    }
}
