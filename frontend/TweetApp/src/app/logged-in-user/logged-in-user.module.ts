import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { ViewTweetsComponent } from './view-tweets/view-tweets.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewUsersComponent } from './view-users/view-users.component';
import { ViewAllTweetsComponent } from './view-all-tweets/view-all-tweets.component';
import { InputTextModule } from 'primeng/inputtext';

import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { HttpClientModule } from '@angular/common/http';
import { InputMaskModule } from 'primeng/inputmask';
import { DialogModule } from 'primeng/dialog';


const routes: Routes = [
  { path: '', redirectTo: '/user/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: UserDashboardComponent }
];

@NgModule({
  declarations: [UserDashboardComponent, ViewTweetsComponent, ViewUsersComponent, ViewAllTweetsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    ReactiveFormsModule,
    FormsModule,
    SelectButtonModule,
    FormsModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    ReactiveFormsModule,
    InputMaskModule,
    HttpClientModule,
    DialogModule  
  ]
})
export class LoggedInUserModule { }
