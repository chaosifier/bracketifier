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
import { DatePipe } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { StandardResponseModel } from '../../models/login-response';
import { UiHelperService } from '../../services/ui-helper.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ParticipantItemDataModel } from '../participant.types';
import { ParticipantService } from '../participant.service';
import { TournamentService } from '../../tournament/tournament.service';
import { ParticipantDataService } from '../participant-data.service';

@Component({
  selector: 'app-participant-item-card',
  templateUrl: './participant-item-card.component.html',
  styleUrl: './participant-item-card.component.css',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    DatePipe,
    MatChipsModule,
    RouterLink,
  ],
})
export class ParticipantItemCardComponent {
  @Input('data') participantData: ParticipantItemDataModel | null = null;
  @Output() onDelete = new EventEmitter<string>();

  #tournamentSvc = inject(TournamentService);
  #uiHelperSvs = inject(UiHelperService);
  #routerSvc = inject(Router);
  #activatedRoute = inject(ActivatedRoute);
  #participantSvc = inject(ParticipantService);
  #participandDataSvc = inject(ParticipantDataService);

  editParticipant() {
    if (!this.participantData) {
      return;
    }
    // this.editEvent.emit(this.participantData);
    this.#participandDataSvc.sendData(this.participantData);
    const tournamentId = this.#activatedRoute.snapshot.params['tournamentId'];
    const participantId = this.participantData._id;
    this.#routerSvc.navigate([
      'tournaments',
      tournamentId,
      'participants',
      participantId,
      'update',
    ]);
  }
  deleteParticipant() {
    if (!this.participantData) {
      return;
    }
    const tournamentId = this.#activatedRoute.snapshot.params['tournamentId'];
    this.#participantSvc
      .deleteParticipant(tournamentId, this.participantData._id)
      .subscribe(
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
