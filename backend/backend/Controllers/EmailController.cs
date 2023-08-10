//using DAL.Model;
//using Microsoft.AspNetCore.Identity;
//using Microsoft.AspNetCore.Mvc;

//namespace backend.Controllers
//{
//    public class EmailController : Controller
//    {
//        private readonly UserManager<User> _userManager;

//        public EmailController(UserManager<User> userManager)
//        {
//            _userManager = userManager;
//        }
//        public async Task<IActionResult> ConfirmEmail(string token, string email)
//        {
//            var user = await _userManager.FindByEmailAsync(email);
          
//            if (user == null)
//                return View("Error");

//            var result = await _userManager.ConfirmEmailAsync(user, token);
//            return View(result.Succeeded ? "ConfirmEmail" : "Error");
//        }
//    }
//}
