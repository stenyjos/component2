using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TweetApp.Interface;
using TweetApp.Models;

namespace TweetApp.Services
{
    public class UserService : IUser
    {
        private readonly IDataRepository sqldataRepository;
        //dependency injection
        public UserService(IDataRepository _sqldataRepository)
        {
            sqldataRepository = _sqldataRepository;
        }

        public async Task<List<User>> GetAllUsers()
        {
                try
                {
                    var users = await sqldataRepository.FetchAllUsers();
                foreach (var user in users)
                    {
                        user.Password = "";
                       
                    }
                    return users;
                }
                catch (Exception ex)
                {
                    throw ex;

                }
            
        }

        public async Task<User> LoginUser(LoginClass login)
        {
            
                try
                {
                    var user = await sqldataRepository.FetchUserByEmail(login.emailId);
                    if (user != null)
                    {
                      if (user.Password.Trim() == login.password)
                      {
                        user.Password = "";
                         return user;
                      }
                    return null;
                    }
                    else
                    {
                      return null;
                    }
                }
                catch (Exception ex)
                {
                    throw ex;

                }
            
        }

        public async Task<User> RegisterUser(User userInfo)
        {
            try
            {
                userInfo.CreatedAt = DateTime.UtcNow;
                userInfo.UpdatedAt = DateTime.UtcNow;
                var response = await sqldataRepository.FetchUserByEmail(userInfo.Email);
                if (response == null)
                {
                    var user = await sqldataRepository.InsertUser(userInfo);
                    user.Password = "";
                 
                    return user;
                }
                else
                {
                    return null;
                }
               
            }
            catch (Exception ex)
            {
                throw ex;

            }
        }

        public async Task<bool> ResetPassword(ResetPasswordClass resetPassword)
        {
            try
            {
                var user = await sqldataRepository.FetchUserByEmail(resetPassword.emailId);
                if (user.Password.Trim() == resetPassword.oldPassword)
                {
                    user.Password = resetPassword.newPassword;
                    var userUpdated = await sqldataRepository.UpdateUser(user);
                    return true;
                }
                return false;
            }
            catch (Exception ex)
            {
                throw ex;

            }
        }
    }
}
