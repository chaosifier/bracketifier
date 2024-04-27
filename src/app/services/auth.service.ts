import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { StateService } from './state.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  #http = inject(HttpClient);
  #stateSvc = inject(StateService);
  createUser(user: any) {
    console.log(user);
    const url = environment.createUserUrl;
    return this.#http.post<any>(url, user);
  }

  signin(obj: any) {
    console.log(obj);
    const url = environment.getUserUrl;
    return this.#http.post<any>(url, obj);
  }

  checkLogin() {
    console.log(`state-----> `, this.#stateSvc.state());
    return this.#stateSvc.state().jwtToken ? true : false;
    // check jwt expiry time
  }
}
