﻿using BAL.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Shared.Common;
using Shared.DTO;
using Shared.DTO.Paging;
using System.Security.Claims;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
     
    public class UserController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly IAccountService _userService;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public UserController(IProductService productService, IAccountService userService, IWebHostEnvironment webHostEnvironment)
        {
            _productService = productService;
            _userService = userService;
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpGet("getall")]
        public async Task<IActionResult> GetAll([FromQuery] PaginationFilter filter)
        {
            var res = new ApiResponse();
            var response = new PagedResponse();
            try
            {
                var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

                var productList = await _productService.GetAll();
                if (productList != null)
                {
                   
                    var pagedData = productList.Skip((validFilter.PageNumber - 1) * validFilter.PageSize).Take(validFilter.PageSize).ToList();
                    if (pagedData != null)
                    {
                        response.Data = pagedData;
                        var totalPages = productList.Count() / (double)validFilter.PageSize;
                        response.TotalPages = Convert.ToInt32(Math.Ceiling(totalPages));
                        return Ok(response);
                    }
                }
                throw new Exception("Failed to load");
            }
            catch (Exception ex)
            {
                res.Success = false;
                res.ErrorMessage = ex.Message;
                return BadRequest(res);
            }
        }

        [HttpPost("findCars")]
        public async Task<IActionResult> FindCars(FindCarModel model, [FromQuery] PaginationFilter filter)
            {
            var res = new ApiResponse();
            var response = new PagedResponse();
            try
            {
                var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

                var productList = await _productService.FindAvailability(model);
                if (productList != null)
                {

                    var pagedData = productList.Skip((validFilter.PageNumber - 1) * validFilter.PageSize).Take(validFilter.PageSize).ToList();
                    if (pagedData != null)
                    {
                        response.Data = pagedData;
                        var totalPages = productList.Count() / (double)validFilter.PageSize;
                        response.TotalPages = Convert.ToInt32(Math.Ceiling(totalPages));
                        return Ok(response);
                    }
                }

                throw new Exception("Failed to load");
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.ErrorMessage = ex.Message;
                return BadRequest(response);
            }
        }

        [HttpGet("getCar/{id:guid}")]
        public async Task<IActionResult> GetCarById(Guid id)
        {
            var response = new ApiResponse();
            try
            {
                var res = await _productService.GetCarById(id);
                if(res != null)
                {
                    response.Data = res;
                    return Ok(response.Data);
                }
                throw new Exception("unable to get");
            }
            catch(Exception ex)
            {
                response.Success = false;
                response.ErrorMessage = ex.Message;
                return BadRequest(response);
            }
        }

        [HttpPut("update")]
        public async Task<IActionResult> UpdateProfile([FromForm] ProfileRequestModel model)
        {
            var userId = User.FindFirstValue(ClaimTypes.Name);
            var response = new ApiResponse();
            try
            {
                if (model.Image != null)
                {
                    var fileResult = SaveImage(model.Image);
                    model.ImagePath = fileResult.Item1;  //getting the path of the image
                }

                var user = await _userService.UpdateProfile(model, userId);
                
                if (user != null)
                {
                    response.Data = user;
                    return Ok(response.Data);
                }
                throw new Exception("failed to update");
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.ErrorMessage = ex.Message;
                return BadRequest(response);
            }
        }

        [HttpGet("searchCarByBrand/{id:guid}")]
        public async Task<IActionResult> SearchByBrand(Guid id)
        {
            var response = new ApiResponse();
            try
            {
                var res = await _productService.SearchByBrand(id);
                response.Data = res;
                return Ok(response.Data);
            } catch(Exception ex)
            {
                response.Success = false;
                response.ErrorMessage = ex.Message;
                return BadRequest(response);
            }
        }

        [HttpPost("bookCar")]
        public async Task<IActionResult> BookCar(BookingCarRequestModel model)
        {
            var userId = User.FindFirstValue(ClaimTypes.Name);
            var response = new ApiResponse();
            try
            {
                var res = await _productService.BookingCar(model, userId);
                response.Data = res;
                return Ok(response.Data);   
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.ErrorMessage = ex.Message;
                return BadRequest(response);
            }
        }

        [HttpGet("getBookings")]
        public async Task<IActionResult> GetAllBookingsOfAUser()
        {
            var userId = User.FindFirstValue(ClaimTypes.Name);
            var response = new ApiResponse();
            try
            {
                var res = await _productService.GetAllBookingsOfAUser(userId);
                response.Data = res;
                return Ok(response.Data);
            }
            catch(Exception ex)
            {
                response.Success = false;
                response.ErrorMessage = ex.Message;
                return BadRequest(response);
            }
        }

        [HttpDelete("/CancelBooking/{id:guid}")]
        public async Task<IActionResult> CancleBooking(Guid id)
        {
            var response = new ApiResponse();
            try
            {
                var res = await _productService.CancelBooking(id);
                response.Data = res;
                return Ok(response.Data);
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.ErrorMessage = ex.Message;
                return BadRequest(response);
            }
        }
        [NonAction]
        public Tuple<string, string> SaveImage(IFormFile imageFile)
        {
            try
            {
                var contentPath = this._webHostEnvironment.WebRootPath;
                var path = Path.Combine(contentPath, "Images");

                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }
                var ext = Path.GetExtension(imageFile.FileName);
                string uniqueString = Guid.NewGuid().ToString();

                var newFileName = uniqueString + ext;
                var fileWithPath = Path.Combine(path, newFileName);
                var stream = new FileStream(fileWithPath, FileMode.Create);
                imageFile.CopyTo(stream);
                stream.Close();

                return new Tuple<string, string>("https://localhost:7104/Images/" + newFileName, newFileName);
            }
            catch (Exception ex)
            {
                return new Tuple<string, string>("0", "Error has occured");
            }
        }

    }
}
