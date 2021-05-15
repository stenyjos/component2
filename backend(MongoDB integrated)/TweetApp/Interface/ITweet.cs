using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TweetApp.Models;

namespace TweetApp.Interface
{
    public interface ITweet
    {
        public Task<List<Tweet>> ViewAllTweets();
        public Task<List<Tweet>> ViewAllTweetsByUser(string userId);
        public Task<Tweet> PostTweet(Tweet tweetInfo);
    }
}
