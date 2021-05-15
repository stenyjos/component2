using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TweetApp.Interface;
using TweetApp.Models;

namespace TweetApp.Services
{
    public class TweetService : ITweet
    {
        private readonly IDataRepository sqldataRepository;
        //dependency injection
        public TweetService(IDataRepository _sqldataRepository)
        {
            sqldataRepository = _sqldataRepository;
        }
        public async Task<Tweet> PostTweet(Tweet tweetInfo)
        {
            try
            {
                tweetInfo.CreatedAt = DateTime.UtcNow;
                tweetInfo.UpdatedAt = DateTime.UtcNow;
                var tweet = await sqldataRepository.InsertNewTweet(tweetInfo);

                return tweet;
            }
            catch (Exception ex)
            {
                throw ex;

            }
        }

        public async Task<List<Tweet>> ViewAllTweets()
        {
            try
            {
                return await sqldataRepository.FetchAllTweets();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<Tweet>> ViewAllTweetsByUser(string userId)
        {
            try
            {
                return await sqldataRepository.FetchAllTweetsByUser(userId);
            }
            catch (Exception ex)
            {
                throw ex;

            }
        }
    }
}
