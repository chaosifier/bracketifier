import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../services/auth.service';
import { StateService } from '../services/state.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UiHelperService } from '../services/ui-helper.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: `./layout.component.html`,
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  #stateSvc = inject(StateService);
  $userInfo = this.#stateSvc.state;

  signout() {
    this.#stateSvc.signOut();
  }
}