import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FacadeDashboardService } from '../service/facade-dashboard.service';
import {LoginService} from '../service/login.service';
import { formatDate } from '@angular/common';

interface Post {
  startDate: Date;

}

@Component({
  selector: 'app-login-dashboard',
  templateUrl: './login-dashboard.component.html',
  styleUrls: ['./login-dashboard.component.css']
})



export class LoginDashboardComponent implements OnInit, OnDestroy {

  loginOptions = [
    { label: 'Login', value: 0 },
    { label: 'Sign Up', value: 1 }
  ];

  post: Post = {
    startDate: new Date(Date.now()),
  }
  selectedOptions = 0;
  dialogBox = {
    visibility: false,
    title: '',
    message: ''
  };
 
  genderOptions = [
    {value:'Male'},
    {value:'Female'}];
  loginForm: FormGroup;
  signUpForm: FormGroup;
  forgotPasswordForm: FormGroup;

  password = '';
  confirmPassword = '';

  sgnupPassSub: Subscription = new Subscription();
  sgnupCnfrmPassSub: Subscription = new Subscription();

  private ngUnSubscribe = new Subject();

  sgninSrvceSub: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private loginService:LoginService,
    private facadeDashboardService: FacadeDashboardService,
    private router: Router) {
      this.loginForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      });
      this.signUpForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        gender: ['', Validators.required],
        email: ['', Validators.required],
        dateOfBirth: [formatDate(this.post.startDate, 'yyyy-MM-dd', 'en'), [Validators.required]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        phoneNumber: ['', [Validators.required]],
      });
      this.forgotPasswordForm = this.formBuilder.group({
        email: ['', Validators.required],
        oldPassword: ['', Validators.required],
        newPassword: ['', Validators.required]
      });
   
  }

  ngOnInit(): void {
   
    this.selectedOptions = 0;
    // tslint:disable-next-line: deprecation

    this.sgnupPassSub = this.signUpForm.controls.password.valueChanges.subscribe((data: string) => {
      if (data) {
        if (data.length < 8) {
          this.signUpForm.controls.password.setErrors({ 'minlength': true });
          return;
        } else {
          this.signUpForm.controls.password.setErrors(null);
        }
        this.password = data;
        this.checkPassword();
      }
    });
    
    this.sgnupCnfrmPassSub = this.signUpForm.controls.confirmPassword.valueChanges.subscribe((data: string) => {
      if (data) {
        this.confirmPassword = data;
        this.checkPassword();
      }
    });
  }
  changeGender(e:any) {
    console.log(e.target.value);
  }
  onSignIn(): void {
    const requestObject = {
      emailId: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value
    };
    this.facadeDashboardService.callLoginService(requestObject);
    this.sgninSrvceSub = this.facadeDashboardService.loginObservable.pipe(takeUntil(this.ngUnSubscribe)).subscribe(serviceData => {
      
      if (Object.keys(serviceData).length > 0) {
         
          if(serviceData.status == false)
          {
             this.showPopUp('Invalid Credential. Please try again.', 'Error');
          }
          else{
            this.router.navigateByUrl('/user');
          }
      }         
    });
  }

  onSignUp(): void {
    const requestObject = {
    
     
      firstname: this.signUpForm.controls.firstName.value,
      lastname: this.signUpForm.controls.lastName.value,
      gender: this.signUpForm.controls.gender.value,
      email: this.signUpForm.controls.email.value,
      dob : this.signUpForm.controls.dateOfBirth.value,
      password: this.signUpForm.controls.password.value,
      contactnumber: this.signUpForm.controls.phoneNumber.value,
     
    };
    this.facadeDashboardService.callUserRegisterService(requestObject);
    this.sgninSrvceSub = this.facadeDashboardService.registerUserObservable.pipe(takeUntil(this.ngUnSubscribe)).subscribe(serviceData => {

      if (Object.keys(serviceData).length > 0) {
        if(serviceData.status == false)  {
          this.showPopUp('User Already exists.Please try again after some time', 'Error');
        }
       else  {
          this.showPopUp('User registered successfully.', 'Success');
          this.selectedOptions = 0;
          this.resetForm();
        }  
      }
    });
  }

 

  onForgotPasswordClick(): void {
    this.selectedOptions = 2;
    this.resetForm();
  }

  resetForm(): void {
    this.loginForm.reset();
    this.signUpForm.reset();
    this.forgotPasswordForm.reset();
    this.password = '';
    this.confirmPassword = '';

  }

  checkPassword(): void {
    if (this.password === '' || this.confirmPassword === '' || this.password === this.confirmPassword) {
      this.signUpForm.controls.password.setErrors(null);
      return;
    } else {
      this.signUpForm.controls.password.setErrors({ passwordmismatch: true });
      return;
    }
  }

  showPopUp(message: string, title: string): void {
    this.dialogBox.visibility = true;
    this.dialogBox.title = title;
    this.dialogBox.message = message;
    setTimeout(() => {
      this.dialogBox.visibility = false;
      this.dialogBox.title = '';
      this.dialogBox.message = '';
    }, 6000);
  }

  ngOnDestroy(): void {
    if (this.sgnupCnfrmPassSub) {
      this.sgnupCnfrmPassSub.unsubscribe();
    }
    if (this.sgnupPassSub) {
      this.sgnupPassSub.unsubscribe();
    }
    if (this.sgninSrvceSub) {
      this.sgninSrvceSub.unsubscribe();
    }
    this.facadeDashboardService.resetBehaviorSubject();
  }

}
