using DAL.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
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
        
        public AccountController(UserManager<User> userManager, IConfiguration config, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _config = config;
            _roleManager = roleManager;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if(user == null) {
                var response =  new ResponseModel()
                {
                    ErrorMessage = "User not exists!!"
                };
                return Unauthorized(response.ErrorMessage);
            }
            else
            {
                //check password
                var pwdMatch = await _userManager.CheckPasswordAsync(user, model.Password);
                if(pwdMatch)
                {
                    var userRoles = await _userManager.GetRolesAsync(user);
                    var authClaims = new List<Claim>()
                    {
                        new Claim(ClaimTypes.Name, user.Id),
                        new Claim(ClaimTypes.NameIdentifier, user.FirstName.ToString()),
                        new Claim(ClaimTypes.Email, user.Email),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                    };

                    foreach(var role in userRoles)
                    {
                        authClaims.Add(new Claim(ClaimTypes.Role, role));
                    }

                    var token = GenerateJwtToken(authClaims);
                    return Ok(new { Token = token });
                } 
               
                var response = new ResponseModel()
                {
                    ErrorMessage = "Invalid Credentials"
                };

                return BadRequest(new { response.ErrorMessage });
            }

            string GenerateJwtToken(IEnumerable<Claim> claims)
            {
                var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));

                var token = new JwtSecurityToken(
                    expires: DateTime.Now.AddMinutes(50),
                    claims: claims,
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256Signature)
                );

                var tokenHandler = new JwtSecurityTokenHandler();
                string tokenString = tokenHandler.WriteToken(token);
                return tokenString;
            }

        }

        [HttpPost("signup")]
        public async Task<IActionResult> Signup(SignupModel model)
        {
            var isExists = await _userManager.FindByEmailAsync(model.Email);
            if(isExists == null)
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

                if(result.Succeeded)
                {
                    await _userManager.AddToRoleAsync(user, allRoles[1]);
                    return Ok(new { User = user});
                }
            }

            var response = new ResponseModel()
            {
                ErrorMessage = "User already exists with this Email Id"
            };
            return BadRequest(new { response.ErrorMessage });
            
        }
    }
}
