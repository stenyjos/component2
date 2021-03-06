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

  private loginBehaviorSubject = new BehaviorSubject<any>({});
  loginObservable = this.loginBehaviorSubject.asObservable();

  private registerUserBehaviorSubject = new BehaviorSubject<any>({});
  registerUserObservable = this.registerUserBehaviorSubject.asObservable();

  callLoginService(requestObject: any): void {
    this.loginBehaviorSubject.next({});
    // tslint:disable-next-line: deprecation
    this.loginService.callLoginService(requestObject).subscribe((data) => {
      this.loginBehaviorSubject.next(data);
    });
  }

  callUserRegisterService(requestObject: any): void {
    this.registerUserBehaviorSubject.next({});
    // tslint:disable-next-line: deprecation
    this.loginService.callUserRegisterService(requestObject).subscribe((data) => {
      this.registerUserBehaviorSubject.next(data);
    });
  }

  resetBehaviorSubject(): void {
    this.loginBehaviorSubject.next({});
  }

}
