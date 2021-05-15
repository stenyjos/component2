import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {

  userData: any = [];

  constructor( private loginService:LoginService) { }

  ngOnInit(): void {
    this.getAllUserDetails();
  }
  async getAllUserDetails()
  {
    debugger
   await this.loginService.getAllUsers().subscribe(
      data =>{
        if (Object.keys(data).length > 0) {
          this.userData=data;
          this.userData.forEach((element:any={}) =>{
            element.userName = element.firstName+' '+element.lastName;
            element.loginId = element.firstName+element.userId.substr(0, 4);
          });
      }
      });
  }
}
