using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TweetApp.Models;

namespace TweetApp.Interface
{
    public interface IUser
    {
        public Task<User> RegisterUser(User userInfo);
        public Task<User> LoginUser(LoginClass login);
        public Task<bool> ResetPassword(ResetPasswordClass resetPassword);
        public Task<List<User>> GetAllUsers();
    }
}
