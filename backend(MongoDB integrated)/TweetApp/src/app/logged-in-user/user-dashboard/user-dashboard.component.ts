import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  userAction = 0;
  userLoginId: string;
  userName: string;

  newTweet: string;
  hashTag: string;
  tweetData: any = [];

  constructor(
    private router: Router) {
    this.newTweet = '';
    this.hashTag = '';
    this.userLoginId = 'karunjossy333';
    this.userName = 'Karun Jossy Edathadathil';
  }

  ngOnInit(): void {
    this.onNavigationClick(1);
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

  }

}
