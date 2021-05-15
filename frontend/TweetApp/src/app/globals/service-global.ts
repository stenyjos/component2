import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ServiceGlobal {

    constructor() { }

    getServiceList(): { [key: string]: string } {
        return {
            USER_REGISTER: environment.servername + '/api/User/Register',
            USER_LOGIN: environment.servername + '/api/User/Login',
            RESETPASSWORD : environment.servername + '/api/User/ResetPassword',
            USER_FORGOT_PASSWORD: environment.servername + '/api/v1.0/tweets/' + '<username>/forgot',
            VIEW_ALL_TWEET: environment.servername + '/api/Tweet/AllTweets',
            VIEW_ALL_USERS: environment.servername + '/api/User/GetAllUsers',
            SEARCH_USER_NAME: environment.servername + '/api/v/1.0/tweets/user/search/' + 'username*',
            GET_USER_TWEET: environment.servername + '/api/Tweet/GetAllTweetByUser/',
            POST_TWEET: environment.servername + '/api/Tweet/PostMyTweet',
            UPDATE_TWEET: environment.servername + '/api/v1.0/tweets/' + '<username>/update/<id>',
            DELETE_TWEET: environment.servername + '/api/v1.0/tweets/' + '<username>/delete/<id>',
            LIKE_TWEET: environment.servername + '/api/v1.0/tweets/' + '<username>/like/<id>',
            REPLY_TWEET: environment.servername + '/api/v1.0/tweets/' + '<username>/reply/<id>'
        };
    }
}
