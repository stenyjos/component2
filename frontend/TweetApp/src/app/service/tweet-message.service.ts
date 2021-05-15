import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceGlobal } from '../globals/service-global';

@Injectable({
  providedIn: 'root'
})
export class TweetMessageService {


  serviceGlobal = this.environmentGlobal.getServiceList();
  constructor(
    private environmentGlobal: ServiceGlobal,
    private http: HttpClient) { }


    postTweet(requestObject: any) {
         const serviceUrl = this.serviceGlobal.POST_TWEET;
        return this.http.post<any>(serviceUrl, requestObject);
      };
     
    viewMyTweets(requestObject: any) {
      const serviceUrl = this.serviceGlobal.GET_USER_TWEET+requestObject;
     return this.http.post<any>(serviceUrl, requestObject);
   };

   viewAllTweets(){
    const serviceUrl = this.serviceGlobal.VIEW_ALL_TWEET;
    return this.http.get<any>(serviceUrl);
   }
   


}
