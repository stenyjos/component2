using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

#nullable disable

namespace TweetApp.Models
{
    public partial class Tweet
    {
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string TweetId { get; set; }
        public string TweetMsg { get; set; }
        public string UserId { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public virtual User User { get; set; }
    }
}
