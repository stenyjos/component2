import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ServiceGlobal {

    constructor() { }

    getServiceList(): { [key: string]: string } {
        return {
            USER_REGISTER: environment.servername + '/api/v1.0/tweets/register',
            USER_LOGIN: environment.servername + '/api/v1.0/tweets/login',
            USER_FORGOT_PASSWORD: environment.servername + '/api/v1.0/tweets/' + '<username>/forgot',
            VIEW_ALL_TWEET: environment.servername + '/api/v1.0/tweets/all',
            VIEW_ALL_USERS: environment.servername + '/api/v1.0/tweets/users/all',
            SEARCH_USER_NAME: environment.servername + '/api/v/1.0/tweets/user/search/' + 'username*',
            GET_USER_TWEET: environment.servername + '/api/v1.0/tweets/username',
            POST_TWEET: environment.servername + '/api/v1.0/tweets/' + '<username>/add',
            UPDATE_TWEET: environment.servername + '/api/v1.0/tweets/' + '<username>/update/<id>',
            DELETE_TWEET: environment.servername + '/api/v1.0/tweets/' + '<username>/delete/<id>',
            LIKE_TWEET: environment.servername + '/api/v1.0/tweets/' + '<username>/like/<id>',
            REPLY_TWEET: environment.servername + '/api/v1.0/tweets/' + '<username>/reply/<id>'
        };
    }
}
