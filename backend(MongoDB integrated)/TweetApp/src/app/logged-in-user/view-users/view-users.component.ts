import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {

  userData: any = [];

  constructor() { }

  ngOnInit(): void {
    this.userData = [
      {
        userName: 'Karun Jossy',
        loginId: 'karunjossy333',
        profileUrl: null
      }
    ];
  }

}
