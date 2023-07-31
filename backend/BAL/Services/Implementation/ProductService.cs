using DAL.Model;
using DAL.Repository;
using Microsoft.AspNetCore.Identity;
using Shared.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.ConstrainedExecution;
using System.Text;
using System.Threading.Tasks;

namespace BAL.Services.Implementation
{
    public class ProductService : IProductService
    {
        private readonly IGenericRepository<Car> _carRepository = null;
        private readonly IGenericRepository<Brand> _brandRepository = null;
        private readonly IGenericRepository<BookedCar> _bookCarRepository = null;

        public ProductService(IGenericRepository<Car> carRepository, IGenericRepository<Brand> brandRepository, IGenericRepository<BookedCar> bookCarRepository)
        {
            _carRepository = carRepository;
            _brandRepository = brandRepository;
            _bookCarRepository = bookCarRepository;

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
        public async Task<ProductResponseModel> GetCarById(Guid id)
        {
            try
            {
                var res = await _carRepository.GetById(id);
                var brandName = _brandRepository.GetAll().FirstOrDefault(x => x.Id == res.BrandId).Name;
                if (res != null)
                {
                    var product = new ProductResponseModel()
                    {
                         CarModel = res.Model, 
                         Brand = brandName, 
                         PricePerHour = res.PricePerHour,
                         Image = res.ImageUrl,
                         Seats = res.Seats,
                         ProductId = id
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
                        Seats = car.Seats,
                        ProductId = car.Id
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
        public async Task<BookedCar> BookingCar(BookingCarRequestModel model, string userId)
        {
            try
            {
                var allBookedCars = _bookCarRepository.GetAll().ToList();
                bool flag = true;
                if (allBookedCars.Count > 0)
                {
                    var isExists = allBookedCars.FirstOrDefault(x => x.CarId == model.ProductId);
                    
                    if (isExists != null)
                    {
                        //check the start and end datetime
                        
                        if((model.StartDate >= isExists.From && model.StartDate <= isExists.To) || (model.EndDate <= isExists.To && model.EndDate>=isExists.From))
                        {
                            flag = false;
                        }
                        else
                        {
                            flag = true;
                        }
                    }
                }  
               
                if(flag)
                {
                    var obj = new BookedCar()
                    {
                        Id = Guid.NewGuid(),
                        CarId = model.ProductId,
                        From = model.StartDate,
                        To = model.EndDate,
                        TotalRent = model.TotalPrice,
                        UserId = userId
                    };
                    await _bookCarRepository.AddAsync(obj);
                    return obj;
                }
                throw new Exception("Already booked Please Choose different time slot");
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<IEnumerable<ProductResponseModel>> FindAvailability(FindCarModel model)
        {
            try
            {
                HashSet<Guid> addedCarIds = new HashSet<Guid>();
                List<ProductResponseModel> products = new List<ProductResponseModel>();
                var allCars = _carRepository.GetAll().ToList();
                var allBookedCars = _bookCarRepository.GetAll().ToList();

                foreach (var car in allCars)
                {
                    bool isAvailable = IsCarAvailableForDates(car, model.StartDate, model.EndDate, allBookedCars);
                    if (isAvailable) 
                    {
                        var brandName = _brandRepository.GetAll().FirstOrDefault(x => x.Id == car.BrandId).Name;

                        var product = new ProductResponseModel()
                        {
                            CarModel = car.Model,
                            Brand = brandName,
                            PricePerHour = car.PricePerHour,
                            Image = car.ImageUrl,
                            Seats = car.Seats,
                            ProductId = car.Id
                        };
                        if (!addedCarIds.Contains(car.Id))
                        {
                            products.Add(product);
                            addedCarIds.Add(car.Id);
                        }
                    }
                }

                return products;
            }
            catch (Exception ex) { throw ex; }
        }
        private bool IsCarAvailableForDates(Car car, DateTime startDate, DateTime endDate, List<BookedCar> allBookedCars)
        {
            foreach (var bookedCar in allBookedCars.Where(b => b.CarId == car.Id))
            {
                if (startDate <= bookedCar.To && endDate >= bookedCar.From)
                {
                    return false;
                }
            }
            return true;
        }
        public async Task<IEnumerable<BookingsResponseModel>> GetAllBookingsOfAUser(string userId)
        {
            try
            {
                List<BookingsResponseModel> allBookings = new List<BookingsResponseModel>();
                var bookings = _bookCarRepository.GetAll().Where(x => x.UserId == userId).ToList(); 
                foreach (var b in bookings)
                {
                    var carDetails = _carRepository.GetAll().FirstOrDefault(x => x.Id == b.CarId);
                   
                    var brandName = _brandRepository.GetAll().FirstOrDefault(x => x.Id == carDetails.BrandId).Name;

                    var booking = new BookingsResponseModel()
                    {
                        CarModel = carDetails.Model,
                        Brand = brandName,
                        PricePerHour = carDetails.PricePerHour,
                        TotalPrice = b.TotalRent,
                        StartDate = b.From,
                        EndDate = b.To,
                        Image = carDetails.ImageUrl
                    };
                    allBookings.Add(booking);
                }
                return allBookings;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

    }
}
