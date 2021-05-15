using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TweetApp.Interface;
using TweetApp.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TweetApp.Controllers
{

    [Route("api/User")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUser iuserServiceInfo;

        public UserController(IUser _iuserServiceInfo)
        {
            iuserServiceInfo = _iuserServiceInfo;
        }
        // GET: api/<UserController>
        [HttpGet]
        [Route("GetAllUsers")]
        public async Task<IActionResult> GetAllUsers()
        {
            try
            {

                var users = await iuserServiceInfo.GetAllUsers();
                return new OkObjectResult(users);
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex.Message);
            }
        }

        // POST api/<UserController>
        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult>Register([FromBody] User userInfo)
        {
            try
            {
                if (userInfo.FirstName.ToString() == "" || userInfo.Gender.ToString() == "" || userInfo.Email.ToString() == "" || userInfo.Password.ToString() == "")
                {
                    return new BadRequestObjectResult("Fill the mandatory fields");
                }
                else
                {
                     var user = await iuserServiceInfo.RegisterUser(userInfo);
                    if (user == null)
                    {
                        return new BadRequestObjectResult("EmailID Already Exist");
                    }
                    return new OkObjectResult(user);
                }
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex.Message);
            }
        }

        // POST api/<UserController>
        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] LoginClass login)
        {
            try
            {
                //if (login.emailId == "" || login.password == "")
                //{
                //    return new BadRequestObjectResult("Fill the mandatory fields");
                //}
                //else
                //{
                    var result = await iuserServiceInfo.LoginUser(login);
              
                   if (result !=null )
                    {
                        return new OkObjectResult(result);
                    }
                    else
                    {
                     return new BadRequestObjectResult( "Incorrect username/password" );
                    }
                //}
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex.Message);
            }
        }
        // POST api/<UserController>
        [HttpPost]
        [Route("ResetPassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordClass resetPassword)
        {
            try
            {
                if (resetPassword.emailId == "" || resetPassword.oldPassword == "" || resetPassword.newPassword == "")
                {
                    return new BadRequestObjectResult("Fill the mandatory fields");
                }
                else
                {
                    var result = await iuserServiceInfo.ResetPassword(resetPassword);
                    if (result)
                    {
                        return new OkObjectResult(result);
                    }
                    else
                    {
                        return new BadRequestObjectResult("Incorrect old password");
                    }
                }
               
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex.Message);
            }

        }
    }
}
