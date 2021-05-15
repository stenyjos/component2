import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { TweetMessageService } from 'src/app/service/tweet-message.service';

@Component({
  selector: 'app-view-all-tweets',
  templateUrl: './view-all-tweets.component.html',
  styleUrls: ['./view-all-tweets.component.css']
})
export class ViewAllTweetsComponent implements OnInit {



  allTweetData: any = [];
  tweetData:any[]=[];
  allTweetUsers:any[]=[];
  constructor(
    private tweetMessageService :TweetMessageService,
    private loginService:LoginService
  ) { }

  ngOnInit(): void {
    debugger
    this.getAllUserDetails();
    this.getAllTweets();
    //  this.tweetData = [
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
  onReply(){

  }
 async  getAllTweets(){
  setTimeout(() => {
   let i,j
   this.tweetMessageService.viewAllTweets().subscribe(
    
      data =>{
        if (Object.keys(data).length > 0) {
        this.allTweetData = data;
      
        this.allTweetData.forEach((element:any={}) => {
          this.allTweetUsers.forEach(index =>{
            if(element.userId == index.userId)
            {
              element.firstName = index.firstName;
              element.userName = element.firstName+element.userId.substr(0, 4);
              element.postTime = element.createdAt;
            }
          });
         
        });
        this.allTweetData;
        }
      });
    }, 300);
  }

 async getAllUserDetails()
  {
   await this.loginService.getAllUsers().subscribe(
      data =>{
        if (Object.keys(data).length > 0) {
        this.allTweetUsers = data;
      }
      });
  }



  onTweetLike()
  {

  }

}
