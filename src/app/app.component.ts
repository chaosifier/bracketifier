import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UiHelperService } from './services/ui-helper.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Bracketifier';
  #uiHelperSvc = inject(UiHelperService);
  $snackbarMessage = this.#uiHelperSvc.$snackbarMessage;

  constructor(private _snackBar: MatSnackBar) {
    effect(() => {
      console.log('layout effect');
      let message = this.$snackbarMessage();
      console.log('snackbar', message);
      if (message) {
        this.openSnackBar(message, 'close');
      }
    });
  }

  openSnackBar(message: string, action: string) {
    const ref = this._snackBar.open(message, action);
    setTimeout(() => ref.dismiss(), 3000);
    ref.afterDismissed().subscribe(() => {
      this.#uiHelperSvc.clearSnackbarState();
    });
  }
}
