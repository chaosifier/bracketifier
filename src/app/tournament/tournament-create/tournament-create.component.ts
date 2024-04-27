import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';

import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { TournamentService } from '../tournament.service';
import {
  TOURNAMENT_TYPE,
  TournamentCreateUpdateRequestModel,
} from '../tournament.types';
import { UiHelperService } from '../../services/ui-helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tournament-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
  ],
  templateUrl: `./tournament-create.component.html`,
  styleUrl: `./tournament-create.component.css`,
})
export class TournamentCreateComponent {
  #tournamentSvc = inject(TournamentService);
  #uiHelperSvs = inject(UiHelperService);
  #navigator = inject(Router);

  tournamentTypes: TOURNAMENT_TYPE[] = Object.values(TOURNAMENT_TYPE);
  tournamentForm = inject(FormBuilder).nonNullable.group({
    title: ['', Validators.required],
    description: [''],
    start_date: ['', Validators.required],
    end_date: ['', Validators.required],
    max_participants: ['', [Validators.required, Validators.min(1)]],
    type: [TOURNAMENT_TYPE.SINGLE_ELIMINATION, Validators.required],
    created_by: [''], // You might want to set this value based on the current user
    status: ['UPCOMING'],
    participants: [[]],
    events: [[]],
  });

  onSubmit() {
    const newTournament = this.getTournamentFormDetail();
    console.log(newTournament);

    this.#tournamentSvc.create(newTournament).subscribe(
      (res) => {
        console.log(`res `, res);
        this.#uiHelperSvs.displaySnackbar(`${newTournament.title} is created`);
        setTimeout(() => {
          this.#uiHelperSvs.clearSnackbarState();
          this.backToTournamentsPage();
        }, 10);
      },
      (err) => {
        this.#uiHelperSvs.displaySnackbar(
          `${newTournament.title} creation is not possible`
        );
        setTimeout(() => this.#uiHelperSvs.clearSnackbarState(), 10);
      }
    );
  }

  backToTournamentsPage() {
    this.#navigator.navigate(['tournaments']);
  }

  private getTournamentFormDetail() {
    return <TournamentCreateUpdateRequestModel>{
      title: this.tournamentForm.value.title || '',
      description: this.tournamentForm.value.description || '',
      start_date: this.tournamentForm.value.start_date,
      end_date: this.tournamentForm.value.end_date,
      type: this.tournamentForm.value.type,
      max_participants: parseInt(
        this.tournamentForm.value.max_participants || '0',
        10
      ),
    };
  }
}
