using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TweetApp.Models;

namespace TweetApp.Interface
{
    public interface IDataRepository
    {
        public Task<User> FetchUserByEmail(string emailId);
        public Task<User> FetchUserByUserId(string userId);

        public Task<List<Tweet>> FetchAllTweets();
        public Task<List<Tweet>> FetchAllTweetsByUser(string userId);
        public Task<Tweet> InsertNewTweet(Tweet tweetInfo);
        

        public Task<User> UpdateUser(User user);
        public Task<List<User>> FetchAllUsers();

        public Task<User> InsertUser(User user);
    }
}
