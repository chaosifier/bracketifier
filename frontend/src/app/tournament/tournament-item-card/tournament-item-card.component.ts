import {
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TournamentItemDataModel } from '../tournament.types';
import { DatePipe } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { TournamentService } from '../tournament.service';
import { StandardResponseModel } from '../../models/login-response';
import { UiHelperService } from '../../services/ui-helper.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'tournament-item-card',
  templateUrl: './tournament-item-card.component.html',
  styleUrl: './tournament-item-card.component.css',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    DatePipe,
    MatChipsModule,
    RouterLink,
  ],
})
export class TournamentItemCardComponent {
  @Input('data') tournamentData: TournamentItemDataModel | null = null;
  @Output() onDelete = new EventEmitter<string>();
  #tournamentSvc = inject(TournamentService);
  #uiHelperSvs = inject(UiHelperService);
  #routerSvc = inject(Router);
  #navigator = inject(Router);

  deleteTournament() {
    if (this.tournamentData) {
      this.#tournamentSvc.delete(this.tournamentData._id).subscribe(
        (res: StandardResponseModel) => {
          this.#uiHelperSvs.displaySnackbar(res.message);

          if (res.success) {
            this.onDelete.next('deleted');
          }
        },
        (err: StandardResponseModel) => {
          this.#uiHelperSvs.displaySnackbar(err.message);
        }
      );
    }
  }

  editTournament() {
    if (this.tournamentData) {
      this.#routerSvc.navigate([
        'tournaments',
        this.tournamentData._id,
        'update',
      ]);
    }
  }

  generateBrackets() {
    if (this.tournamentData) {
      this.#tournamentSvc.generateBracket(this.tournamentData._id).subscribe(
        (res: StandardResponseModel) => {
          this.#uiHelperSvs.displaySnackbar(res.message);

          if (res.success && this.tournamentData?._id) {
            this.#navigator.navigate(['tournaments', this.tournamentData._id]);
          }
        },
        (err: StandardResponseModel) => {
          this.#uiHelperSvs.displaySnackbar(err.message);
        }
      );
    }
  }
}
