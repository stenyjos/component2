import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FacadeDashboardService } from 'src/app/service/facade-dashboard.service';
import { LoginService } from 'src/app/service/login.service';
import {TweetMessageService} from '../../service/tweet-message.service';
import { ViewTweetsComponent } from '../view-tweets/view-tweets.component';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {



  forgotPasswordForm: FormGroup;
  selectedOptions = 0;
  dialogBox = {
    visibility: false,
    title: '',
    message: ''
  };







  userAction = 0;
  userLoginId: any;
  userName: any;
  userId:any;
  sgninSrvceSub: Subscription = new Subscription();
  newTweet: string;
  hashTag: string;
  tweetDetails:any;
  userDetails:any;
  tweetData: any = [];
  allTweetData:any=[]
  isUserIdTweetPresent = true;
  private ngUnSubscribe = new Subject();
  @ViewChild(ViewTweetsComponent, { static: false })
  viewTweetsComponent!: ViewTweetsComponent;
  constructor(
    private router: Router,
    private facadeDashboardService: FacadeDashboardService,
    private tweetMessageService :TweetMessageService,
    private formBuilder: FormBuilder,
    private loginService:LoginService
    ) {
      this.forgotPasswordForm = this.formBuilder.group({
        email: ['', Validators.required],
        oldPassword: ['', Validators.required],
        newPassword: ['', Validators.required]
      });


     
      
    this.newTweet = '';
    this.hashTag = '';
  //  this.userLoginId = 'karunjossy333';
  //  this.userName = 'Karun Jossy Edathadathil';
  }

  ngOnInit(): void {
    this.onNavigationClick(1);
    this.getUserDetails();
    this.viewMyTweets();
  }

  showPopUp(message: string, title: string): void {
    this.dialogBox.visibility = true;
    this.dialogBox.title = title;
    this.dialogBox.message = message;
    setTimeout(() => {
      this.dialogBox.visibility = false;
      this.dialogBox.title = '';
      this.dialogBox.message = '';
    }, 6000);
  }

   onChangePassword(): void {

    const requestObject = {    
        emailId: this.forgotPasswordForm.controls.email.value,
        oldPassword:  this.forgotPasswordForm.controls.oldPassword.value,
        newPassword :this.forgotPasswordForm.controls.newPassword.value,      
    };

    if(requestObject.oldPassword === requestObject.newPassword)
    {
      this.showPopUp('New Password cannot be same as Old Password', 'Error');
      
    }
    else{
    this.loginService.resetPassword(requestObject).subscribe(serviceData => {
      if (serviceData == true) {
      this.showPopUp('Password has been changed successfully', 'Success');
      this.selectedOptions = 0;
      this.resetForm();
      }
      else {
        this.showPopUp('Incorrect old password', 'Error');
      }
    },
    err=>
    {
      this.showPopUp('Incorrect old password', 'Error');
    }
    );
  }
  }

  resetForm(): void {
    
    this.forgotPasswordForm.reset();
  

  }







  getUserDetails()
  {
    this.sgninSrvceSub = this.facadeDashboardService.loginObservable.pipe(takeUntil(this.ngUnSubscribe)).subscribe(serviceData => {
        if (Object.keys(serviceData).length > 0) {
          this.userDetails = serviceData; 
          this.userName = serviceData.firstName;
          this.userLoginId =serviceData.firstName+serviceData.userId.substr(0, 4);//used to display
          this.userId = serviceData.userId;
        }
        });    
  }

async viewMyTweets()
{
 await this.tweetMessageService.viewMyTweets(this.userId).subscribe(data =>{
    const resp = data;
    if (data.length === 0) {
    this.isUserIdTweetPresent = false;
    }
    else{
    this.tweetData = data;
    }
   });
}

  onNavigationClick(selectedOption: number): void {
    this.userAction = selectedOption;
    switch (selectedOption) {
      case 1:
        this.newTweet = '';
        break;
      case 2:
        break;
      case 3:

        break;
      case 4:

        break;
      case 5:
        this.router.navigateByUrl('/login');
        break;
      default:
        break;
    }
  }

postTweet(): void {
  setTimeout(() => {
let requestObject =
    {
      tweetMsg: this.newTweet,
      userId: this.userId
    }
      this.tweetMessageService.postTweet(requestObject).subscribe(data =>
        {
          // this.tweetMessageService.viewMyTweets(this.userId).subscribe(data =>{
          //   this.tweetDetails =data;
          // });
          this.newTweet='';
          debugger
          if(this.viewTweetsComponent == undefined)
          {
            this.viewMyTweets();
          }
          else
          {
          this.viewTweetsComponent.getMyTweet();
          }
        });  }, 300);
  }






}
