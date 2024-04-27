import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { EVENT_STATUS, EVENT_TEAM_RESULT, Event } from '../tournament.types';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { TournamentService } from '../tournament.service';
import { ActivatedRoute, Params } from '@angular/router';
import { UiHelperService } from '../../services/ui-helper.service';

@Component({
  selector: 'tournament-event-item-update-dialogue',
  templateUrl: './tournament-event-item-update-dialogue.component.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatSelectModule, FormsModule]
})
export class TournamentEventItemUpdateDialogue {
  p1Score: number = 5;
  p2Score: number = 0;
  eventState: string = "";
  #tournamentSvc = inject(TournamentService);
  #uiHelperSvs = inject(UiHelperService);
  #tournamentId: string = '';

  constructor(private dialogRef: MatDialogRef<TournamentEventItemUpdateDialogue>, @Inject(MAT_DIALOG_DATA) public data: {
    tournamentId: string,
    event: Event
  }, private route: ActivatedRoute) {
    this.p1Score = data.event.score[0];
    this.p2Score = data.event.score[1];
    this.eventState = data.event.status;
    this.#tournamentId = data.tournamentId;
  }

  save() {
    const p1Won = this.p1Score > this.p2Score;
    let dataToSave = {
      ...this.data.event,
      status: this.eventState,
      start_date: this.data.event.start_date,
      end_date: this.data.event.end_date,
      score: [this.p1Score, this.p2Score],
      teams: [
        {
          ...this.data.event.teams[0],
          status: p1Won ? EVENT_TEAM_RESULT.WON : EVENT_TEAM_RESULT.LOST
        },
        {
          ...this.data.event.teams[1],
          status: p1Won ? EVENT_TEAM_RESULT.LOST : EVENT_TEAM_RESULT.WON
        }
      ]
    };

    console.log(dataToSave)
    this.#tournamentSvc.updateEvent(this.#tournamentId, dataToSave).subscribe(
      res => {
        this.#uiHelperSvs.displaySnackbar(res.message);

        if (res.success) {
          this.dialogRef.close('saved');
        } else {
          this.#uiHelperSvs.displaySnackbar(res.message);
        }
      },
      err => {
        this.#uiHelperSvs.displaySnackbar(err.message);
      }
    );
  }

  close() {
    console.log('close')
    this.dialogRef.close('closed');
  }
}

function StandardResponseModel(error: any): void {
  throw new Error('Function not implemented.');
}

