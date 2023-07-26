using BAL.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Shared.Common;
using Shared.DTO;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class AdminController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public AdminController(IProductService productService, IWebHostEnvironment webHostEnvironment)
        {
            _productService = productService;
            _webHostEnvironment = webHostEnvironment;   
        }
     
        [HttpPost("add")]
        public async Task<IActionResult> Add( [FromForm] ProductRequestModel model)
        {
            var response = new ApiResponse();
            try
            {
                if (model.Image != null)
                {
                    var fileResult = SaveImage(model.Image);

                    model.ImageName = fileResult.Item2; //getting the name of the image
                    model.ImagePath = fileResult.Item1;  //getting the path of the image

                    var res = _productService.Add(model);
                    if (res != null)
                    {
                        response.Success = true;
                        response.Data = model;
                        return Ok(response);
                    }
                }

                throw new Exception("Failed to add data.");
            }
            catch(Exception ex) 
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

        [HttpDelete("delete")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var response = new ApiResponse();
            try
            {
                var res = await _productService.Delete(id);
                if(res != null)
                {
                    response.Success = true;
                }
                return Ok(response);
            }
            catch(Exception ex)
            {
                response.Success = false;
                response.ErrorMessage = ex.Message;
                return BadRequest(response);
            }
        }
    }
}
