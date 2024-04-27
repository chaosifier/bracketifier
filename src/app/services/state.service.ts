import { Injectable, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

interface AppState {
  firstName: string;
  lastName: string;
  jwtToken: string;
}
@Injectable({
  providedIn: 'root',
})
export class StateService {
  #emptyState: AppState = {
    firstName: '',
    lastName: '',
    jwtToken: '',
  };
  #navigator = inject(Router);

  getPersistedState(): AppState {
    const stateData = localStorage.getItem('data') || null;
    if (stateData) return <AppState>JSON.parse(stateData);
    else return this.#emptyState;
  }

  state = signal(this.getPersistedState());

  signOut() {
    this.state.set(this.#emptyState);
    this.#navigator.navigate(['signin']);
  }
  constructor() {
    effect(() => {
      this.savePersistedState(this.state());
    });
  }

  savePersistedState(state: AppState) {
    localStorage.setItem('data', JSON.stringify(state));
  }
}
