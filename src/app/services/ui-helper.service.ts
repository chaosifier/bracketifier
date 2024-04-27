import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiHelperService {
  $snackbarMessage = signal('');

  displaySnackbar(message: string) {
    console.log('displaySnackbar', message);
    this.$snackbarMessage.set(message);
  }

  clearSnackbarState() {
    this.$snackbarMessage.set('');
  }
  constructor() { }
}
