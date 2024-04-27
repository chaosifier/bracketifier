import { Component, OnChanges, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  TOURNAMENT_TYPE,
  TournamentCreateUpdateRequestModel,
} from '../tournament.types';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TournamentService } from '../tournament.service';
import { UiHelperService } from '../../services/ui-helper.service';

@Component({
  selector: 'app-tournament-update',
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
  templateUrl: `./tournament-update.component.html`,
  styleUrl: `./tournament-update.component.css`,
})
export class TournamentUpdateComponent implements OnInit {
  tournamentTypes: TOURNAMENT_TYPE[] = Object.values(TOURNAMENT_TYPE);
  #navigator = inject(Router);
  #activatedRoute = inject(ActivatedRoute);
  #tournamentSvc = inject(TournamentService);
  #uiHelpSvc = inject(UiHelperService);
  #tournamentId = this.#activatedRoute.snapshot.params['tournamentId'];

  tournamentForm = inject(FormBuilder).nonNullable.group({
    title: ['', Validators.required],
    description: [''],
    start_date: ['', Validators.required],
    end_date: ['', Validators.required],
    max_participants: [0, [Validators.required, Validators.min(1)]],
    type: [TOURNAMENT_TYPE.SINGLE_ELIMINATION, Validators.required],
    created_by: [''], // You might want to set this value based on the current user
    status: ['UPCOMING'],
    participants: [[]],
    events: [[]],
  });
  toParticipantForm = inject(FormBuilder).nonNullable.group({});

  ngOnInit(): void {
    if (!this.#tournamentId) {
      return;
    }

    this.#tournamentSvc.getById(this.#tournamentId).subscribe((res) => {
      const data = res.data;
      this.tournamentForm.patchValue({
        start_date: this.formatDateString(data.start_date),
        end_date: this.formatDateString(data.end_date),
        title: data.title,
        description: data.description,
        type: data.type,
        status: data.status,
        max_participants: data.max_participants,
      });
    });
  }

  onSubmit() {
    const tournamentId = this.#activatedRoute.snapshot.params['tournamentId'];
    console.log(`tournament id`, tournamentId);
    if (!tournamentId) {
      return;
    }
    this.#tournamentSvc
      .update(tournamentId, this.getTournamentFormDetail())
      .subscribe(
        (res) => {},
        (err) => {
          this.#uiHelpSvc.displaySnackbar(err);
          setTimeout(() => this.#uiHelpSvc.clearSnackbarState(), 10);
        }
      );
  }
  backToTournamentsPage() {
    this.#navigator.navigate(['tournaments']);
  }
  seeParticipants() {
    this.#navigator.navigate([
      'tournaments',
      this.#tournamentId,
      'participants',
    ]);
  }

  private formatDateString(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = this.padNumber(date.getMonth() + 1);
    const day = this.padNumber(date.getDate());
    const hours = this.padNumber(date.getHours());
    const minutes = this.padNumber(date.getMinutes());
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
  private padNumber(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  private getTournamentFormDetail() {
    return <TournamentCreateUpdateRequestModel>{
      title: this.tournamentForm.value.title || '',
      description: this.tournamentForm.value.description || '',
      start_date: this.tournamentForm.value.start_date,
      end_date: this.tournamentForm.value.end_date,
      type: this.tournamentForm.value.type,
      max_participants: this.tournamentForm.value.max_participants,
    };
  }
}
