import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class FacadeDashboardService {
 

  constructor(
    private loginService: LoginService
  ) { }
  msgError:string ="";
  flagError:boolean=false;
  private loginBehaviorSubject = new BehaviorSubject<any>({});
  loginObservable = this.loginBehaviorSubject.asObservable();

  private registerUserBehaviorSubject = new BehaviorSubject<any>({});
  registerUserObservable = this.registerUserBehaviorSubject.asObservable();

  callLoginService(requestObject: any): void {
    this.loginBehaviorSubject.next({});
    this.loginService.callLoginService(requestObject).subscribe((data) => {

      this.loginBehaviorSubject.next(data);
    },
    err => {
    let data ={status:false};
    this.loginBehaviorSubject.next(data);
  });
  }

  callUserRegisterService(requestObject: any): void {
    this.registerUserBehaviorSubject.next({});
    // tslint:disable-next-line: deprecation
    this.loginService.callUserRegisterService(requestObject).subscribe((data) => {
      this.registerUserBehaviorSubject.next(data);
    },
    err => {
      let data ={status:false};
      this.registerUserBehaviorSubject.next(data);
    }
    );
  }



  

  resetBehaviorSubject(): void {
   // this.loginBehaviorSubject.next({});
  }

}
