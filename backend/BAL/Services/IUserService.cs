using DAL.Model;
using Microsoft.AspNetCore.Identity;
using Shared.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BAL.Services
{
    public interface IUserService
    {
        Task<User> GetUserById(string id);
        Task<ProfileResponseModel> UpdateProfile(ProfileRequestModel model, string id);
    }
}
