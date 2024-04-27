import { CommonModule } from '@angular/common';
import { Component, inject, ɵɵsetComponentScope } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from '../services/auth.service';
import { first } from 'rxjs';
import { StateService } from '../services/state.service';
import { Router } from '@angular/router';
import {
  LoginResponseModel,
  StandardResponseModel,
} from '../models/login-response';
import { UserName, UserPayload } from '../models/user-payload';
import { UiHelperService } from '../services/ui-helper.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: `./signin.component.html`,
  styleUrl: `./signin.component.css`,
})
export class SigninComponent {
  #auth = inject(AuthService);
  #stateSvc = inject(StateService);
  #navigator = inject(Router);
  #uiHelperSvs = inject(UiHelperService);

  isSignDivVisiable = false;

  signUpForm = inject(FormBuilder).nonNullable.group({
    firstname: [],
    lastname: [],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  signInForm = inject(FormBuilder).nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  onRegister() {
    const userPayload = this.getSignUpUserDetails();
    this.#auth.createUser(userPayload).subscribe(
      (res) => {
        if (res && res.success) {
          if (res.userExist) {
            this.#showMessage(`Already have user ${userPayload.name?.first}`);
          } else {
            this.#showMessage(
              `${userPayload.name?.first} Signed Up. Please sign in`
            );
          }
        }
        this.signUpForm.reset();
      },
      (err) => {
        // console.log(`sign up user failed`, err);
        this.signUpForm.reset();
        this.#showMessage(`Sign up user failed. Try again!`);
      }
    );
  }

  onSignIn() {
    this.#auth.signin(this.signInForm.value).subscribe(
      (res: StandardResponseModel<LoginResponseModel>) => {
        const newState = {
          ...this.#stateSvc.state(),
          jwtToken: res.data.jwtToken,
          _id: res.data._id,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          email: res.data.email,
        };

        this.#stateSvc.state.set(newState);
        this.signInForm.reset();

        // this.#showMessage(`Sign up success!`);
        this.#navigator.navigate(['tournaments']);
      },
      (err: StandardResponseModel<LoginResponseModel>) => {
        this.signInForm.reset();
        this.#showMessage(`User not found. Please register!`);
      }
    );
  }

  private getSignUpUserDetails() {
    return <UserPayload>{
      name: <UserName>{
        first: this.signUpForm.value.firstname || '',
        last: this.signUpForm.value.lastname || '',
      },
      email: this.signUpForm.value.email || '',
      password: this.signUpForm.value.password || '',
    };
  }

  get signInEmail() {
    return this.signInForm.get('email') as FormControl;
  }
  get signUpEmail() {
    return this.signUpForm.get('email') as FormControl;
  }

  #showMessage(message: string) {
    this.#uiHelperSvs.displaySnackbar(message);
    setTimeout(() => this.#uiHelperSvs.clearSnackbarState(), 10);
  }
}
