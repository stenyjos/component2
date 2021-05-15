import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceGlobal } from '../globals/service-global';

@Injectable({
  providedIn: 'root'
})
export class LoginService {



  serviceGlobal = this.environmentGlobal.getServiceList();

  constructor(
    private environmentGlobal: ServiceGlobal,
    private http: HttpClient) { }

  callLoginService(requestObject: any): Observable<any> {
    const serviceUrl = this.serviceGlobal.USER_LOGIN;
    return this.http.post<any>(serviceUrl, requestObject);
  }

  callUserRegisterService(requestObject: any): Observable<any> {
    const serviceUrl = this.serviceGlobal.USER_REGISTER;
    return this.http.post<any>(serviceUrl, requestObject);
  }
  resetPassword(requestObject:any)  :Observable<any>{
    const serviceUrl = this.serviceGlobal.RESETPASSWORD;
    return this.http.post<any>(serviceUrl, requestObject);
  }

  getAllUsers(){
    const serviceUrl = this.serviceGlobal.VIEW_ALL_USERS;
    return this.http.get<any>(serviceUrl);
  }

  

}
