using DAL.Model;
using Microsoft.AspNetCore.Identity;
using Shared.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BAL.Services.Implementation
{
    public class AccountService: IAccountService
    {
        private readonly UserManager<User> _userManager;
      
        public AccountService(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        public async Task<User> GetUserById(string id)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(id);
                return user;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<ProfileResponseModel> UpdateProfile(ProfileRequestModel model, string id)
        {
            var response = new ProfileResponseModel();
            try
            {
                var user = await _userManager.FindByIdAsync(id);
                user.Email = model.Email;
                user.FirstName = model.FirstName;
                user.LastName = model.LastName;
                user.UserName = model.Email;

                if(model.Image == null)
                {
                    user.Image = user.Image;
                } else
                {
                    user.Image = model.ImagePath;
                }

                var result = await _userManager.UpdateAsync(user);
                if(result.Succeeded)
                {
                    response.Email = user.Email;
                    response.FirstName = user.FirstName;
                    response.LastName = user.LastName;
                    response.ImagePath = user.Image;

                    return response;
                } else {
                    throw new Exception("");
                }
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
      
    }
}
