import { Component, Input, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FacadeDashboardService } from 'src/app/service/facade-dashboard.service';
import { TweetMessageService } from 'src/app/service/tweet-message.service';

@Component({
  selector: 'app-view-tweets',
  templateUrl: './view-tweets.component.html',
  styleUrls: ['./view-tweets.component.css']
})
export class ViewTweetsComponent implements OnInit {

  myTweet:any;

  @Input()
  tweetData: any = [];
  @Input()
  userDetails:any;
  @Input()
  module = '';
  private ngUnSubscribe = new Subject();
  sgninSrvceSub: Subscription = new Subscription();
  constructor(
    private tweetMessageService :TweetMessageService,
    private facadeDashboardService:FacadeDashboardService
  ) {
    if(this.userDetails == undefined)
    {
      this.sgninSrvceSub = this.facadeDashboardService.loginObservable.pipe(takeUntil(this.ngUnSubscribe)).subscribe(serviceData => {
        if (Object.keys(serviceData).length > 0) {
          this.userDetails = serviceData; 
         
        }
        });
    }
  }

  ngOnInit(): void {
 this.userDetails;
 this.getMyTweet();
    // this.tweetData = [
    //   {
    //     userName: 'Karun Jossy',
    //     loginId: 'karunjossy333',
    //     tweet: 'My First Tweet',
    //     postTime: '02 Apr 2021 10:35:00',
    //     hashTag: 'FirstTweet',
    //     isLiked: true,
    //     noOfLikes: 10,
    //     replyTweet: [
    //       {
    //         userName: 'Karun Jossy',
    //         loginId: 'karunjossy333',
    //         tweet: 'My First Reply Tweet',
    //         postTime: '02 Apr 2021 10:35:00',
    //         replyId: 'karunjossy333',
    //         hashTag: 'FirstReplyTweet',
    //         noOfLikes: 50,
    //         isLiked: false
    //       }
    //     ]
    //   }
    // ];
  }
  
async getMyTweet(){
  await this.tweetMessageService.viewMyTweets(this.userDetails.userId).subscribe(data =>{
    {
    this.myTweet = data;
    this.initializeDetails();
    }
   });
}
initializeDetails()
{
  this.tweetData=[];
  let i =0;
  for(i = 0; i< this.myTweet.length; i++)
  {
  this.tweetData.push(
  {
  loginId : this.userDetails.firstName+this.userDetails.userId.substr(0, 4),
  userName : this.userDetails.firstName,
  postTime : this.myTweet[i].createdAt,
  tweet : this.myTweet[i].tweetMsg
  });
}

}

  onTweetLike(): void {

  }

  onReply(): void {

  }

}
