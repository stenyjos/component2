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

    [Route("api/Tweet")]
    [ApiController]
    public class TweetController : ControllerBase
    {
        private readonly ITweet itweetserviceInfo;

        public TweetController(ITweet _itweetServiceInfo)
        {
            itweetserviceInfo = _itweetServiceInfo;
        }

        // GET: api/<TweetController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        [HttpGet("{id}")]
        [Route("AllTweets")]
        public async Task<IActionResult> AllTweets()
        {
            try
            {

                var tweets = await itweetserviceInfo.ViewAllTweets();
                return new OkObjectResult(tweets);
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex.Message);
            }
        }
        // GET api/<TweetController>/5
        [HttpGet("{id}")]
        [Route("GetAllTweetByUser/{UserId}")]
        public async Task<IActionResult> GetAllTweetByUser(string UserId)
        {
            try
            {

                var tweets = await itweetserviceInfo.ViewAllTweetsByUser(UserId);
                return new OkObjectResult(tweets);
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex.Message);
            }
        }

        // POST api/<TweetController>
        [HttpPost]
        [Route("PostMyTweet")]
        public async Task<IActionResult> PostMyTweet([FromBody] Tweet tweetInfo)
        {
            try
            {
                var tweet = await itweetserviceInfo.PostTweet(tweetInfo);
                return new OkObjectResult(tweet);

            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex.Message);
            }
        }
    }
}
