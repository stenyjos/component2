import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-tweets',
  templateUrl: './view-tweets.component.html',
  styleUrls: ['./view-tweets.component.css']
})
export class ViewTweetsComponent implements OnInit {

  @Input()
  tweetData: any = [];
  @Input()
  module = '';

  constructor() { }

  ngOnInit(): void {
    this.tweetData = [
      {
        userName: 'Karun Jossy',
        loginId: 'karunjossy333',
        tweet: 'My First Tweet',
        postTime: '02 Apr 2021 10:35:00',
        hashTag: 'FirstTweet',
        isLiked: true,
        noOfLikes: 10,
        replyTweet: [
          {
            userName: 'Karun Jossy',
            loginId: 'karunjossy333',
            tweet: 'My First Reply Tweet',
            postTime: '02 Apr 2021 10:35:00',
            replyId: 'karunjossy333',
            hashTag: 'FirstReplyTweet',
            noOfLikes: 50,
            isLiked: false
          }
        ]
      }
    ];
  }

  onTweetLike(): void {

  }

  onReply(): void {

  }

}
