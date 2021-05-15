using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TweetApp.Interface;
using TweetApp.Models;

namespace TweetApp.Repository
{
    public class DataRepository : IDataRepository
    {
    //   private readonly DbContext db;
    //   private readonly DbSet<TweetDetail> tweetDb;
    //   private readonly DbSet<UserDetail> userDb;


    private readonly IMongoCollection<User> userDb;
    private readonly IMongoCollection<Tweet> tweetDb;
    private readonly TweetAppConfig _settings;

    //  public DataRepository(TweetDBContext tweetAppContext)
    //   {
    //    db = tweetAppContext;
    //   tweetDb = db.Set<TweetDetail>();
    //    userDb = db.Set<UserDetail>();
    // }

    public DataRepository(IOptions<TweetAppConfig> settings)
    {
      _settings = settings.Value;
      var client = new MongoClient(_settings.TweetAppDbConnectionString);
      var database = client.GetDatabase(_settings.DataBaseName);
      userDb = database.GetCollection<User>(_settings.UserCollectionName);
      tweetDb = database.GetCollection<Tweet>(_settings.TweetsCollectionName);
    }

    public Task<List<Tweet>> FetchAllTweets()
        {
      return tweetDb.Find(x => true).ToListAsync();

        }

        public async Task<List<Tweet>> FetchAllTweetsByUser(string userId)
        {
      return await tweetDb.Find<Tweet>(x => x.UserId .Equals (userId)).ToListAsync();
    }

        public async Task<List<User>> FetchAllUsers()
        {
        return await userDb.Find(x => true).ToListAsync();
        }

        public async Task<User> FetchUserByEmail(string emailId)
        {
          //  return userDb.Where(x => x.Email == emailId).FirstOrDefault();
      return await userDb.Find<User>(c => c.Email == emailId).FirstOrDefaultAsync();
    }

        public async Task<User> FetchUserByUserId(string userId)
        {
         //   return userDb.Where(x => x.UserId == userId).FirstOrDefault();

        return await userDb.Find<User>(c => c.UserId.Equals(userId)).FirstOrDefaultAsync();
    }
        public async Task<Tweet> InsertNewTweet(Tweet tweetInfo)
      
        {
          await tweetDb.InsertOneAsync(tweetInfo);
          //await db.SaveChangesAsync();

           return tweetInfo;


    }

        public async Task<User> InsertUser(User userInfo)

        {
      await userDb.InsertOneAsync(userInfo);
      //await db.SaveChangesAsync();
      return userInfo;
    }

    public async Task<User> UpdateUser(User userInfo)
        {
      await userDb.ReplaceOneAsync(c => c.UserId == userInfo.UserId, userInfo);
      //await db.SaveChangesAsync();
      return userInfo;
    }
    }
}

