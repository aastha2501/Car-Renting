using BAL.Helpers;
using BAL.Services;
using DAL.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Shared.Common;
using Shared.DTO;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
   
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _config;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IAccountService _accountService;

        public AccountController(UserManager<User> userManager, IConfiguration config, RoleManager<IdentityRole> roleManager, IAccountService accountService)
        {
            _userManager = userManager;
            _config = config;
            _roleManager = roleManager;
            _accountService = accountService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginModel model)
        {
            var response = new ApiResponse();
            try
            {
                var user = await _userManager.FindByEmailAsync(model.Email);
                if (user == null)
                {
                    response.ErrorMessage = "User not exists";
                    return BadRequest(response);
                }
                else
                {
                    //check password
                    var pwdMatch = await _userManager.CheckPasswordAsync(user, model.Password);
                    if (pwdMatch)
                    {
                        var userRoles = await _userManager.GetRolesAsync(user);
                        var authClaims = new List<Claim>()
                    {
                        new Claim(ClaimTypes.Name, user.Id),
                        new Claim(ClaimTypes.NameIdentifier, user.FirstName.ToString()),
                        new Claim(ClaimTypes.Email, user.Email),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                    };

                        foreach (var role in userRoles)
                        {
                            authClaims.Add(new Claim(ClaimTypes.Role, role));
                        }

                        var token = GenerateJwtToken(authClaims);
                        return Ok(new { Token = token });
                    }

                    response.ErrorMessage = "Invalid Credentials";

                    return BadRequest(response);
                }

                string GenerateJwtToken(IEnumerable<Claim> claims)
                {
                    var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));

                    var token = new JwtSecurityToken(
                        expires: DateTime.Now.AddHours(3),
                        claims: claims,
                        signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256Signature)
                    );

                    var tokenHandler = new JwtSecurityTokenHandler();
                    string tokenString = tokenHandler.WriteToken(token);
                    return tokenString;
                }

            }
            catch (Exception ex)
            {
                response.Success = false;
                response.ErrorMessage = ex.Message;
                return BadRequest(response);
            }
          
         
        }

        [HttpPost("signup")]
        public async Task<IActionResult> Signup(SignupModel model)
        {
            var response = new ApiResponse();
            try
            {
                var isExists = await _userManager.FindByEmailAsync(model.Email);
                if (isExists == null)
                {
                    var user = new User()
                    {
                        UserName = model.Email,
                        FirstName = model.FirstName,
                        Email = model.Email,
                        NormalizedEmail = model.Email,
                        LastName = model.LastName
                    };

                    var result = await _userManager.CreateAsync(user, model.Password);

                    var allRoles = _roleManager.Roles.Select(x => x.Name).ToList();

                    if (result.Succeeded)
                    {
                        var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                        var confirmationLink = Url.Action(nameof(ConfirmEmail), "Account", new { token, email = user.Email }, protocol: HttpContext.Request.Scheme);

                        EmailHelper emailHelper = new EmailHelper();
                        bool emailResponse = emailHelper.SendEmail(user.Email, confirmationLink);

                        if (emailResponse)
                        {
                            await _userManager.AddToRoleAsync(user, allRoles[1]);
                            response.Success = true;
                            response.Message = "Singup successful";
                            response.Data = user;
                            return Ok(response);
                        }
                        response.ErrorMessage = "Invalid Email";
                    }
                }
            } catch (Exception ex) {
                response.ErrorMessage = "Error while Sign up";
            }
            return BadRequest(response);
        }

        [HttpGet]
        public async Task<IActionResult> ConfirmEmail(string token, string email)
        {
            var user = await _userManager.FindByEmailAsync(email);

            var response = new ApiResponse();

            if (user == null)
            {
                response.ErrorMessage = "Error";
                return BadRequest(response);
            }

            var result = await _userManager.ConfirmEmailAsync(user, token);
            if(result.Succeeded)
            {
                response.Success = true;
                response.Message = "Confirmed email thanks";
                return Ok(response);
            }
            response.ErrorMessage = "Error";
            return BadRequest(response);
        }

        [HttpGet("profile")]
        public async Task<IActionResult> GetUserById()
        {
            var userId = User.FindFirstValue(ClaimTypes.Name);
            var response = new ApiResponse();
            try
            {
                var user = await _accountService.GetUserById(userId);
                if (user != null)
                {
                    response.Data = user;
                    return Ok(response.Data);
                }
                throw new Exception("Failed to get user data");
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.ErrorMessage = ex.Message;
                return BadRequest(response);
            }
        }
    }
}
