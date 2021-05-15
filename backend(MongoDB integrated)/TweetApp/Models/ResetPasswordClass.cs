using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TweetApp.Models
{
    public class ResetPasswordClass
    {
        public string emailId { get; set; }
        public string oldPassword { get; set; }
        public string newPassword { get; set; }
    }
}
