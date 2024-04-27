import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

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
import { UiHelperService } from '../../services/ui-helper.service';
import { TOURNAMENT_TYPE } from '../../tournament/tournament.types';
import { TournamentService } from '../../tournament/tournament.service';
import {
  PARTICIPANT_STATUS_ENUM,
  ParticipantItemDataModel,
  ParticipantName,
} from '../participant.types';
import { ParticipantService } from '../participant.service';
import { ParticipantDataService } from '../participant-data.service';

@Component({
  selector: 'app-participant-update',
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
  templateUrl: `./participant-update.component.html`,
  styleUrl: `./participant-update.component.css`,
})
export class ParticipantUpdateComponent implements OnInit {
  tournamentTypes: TOURNAMENT_TYPE[] = Object.values(TOURNAMENT_TYPE);
  #navigator = inject(Router);
  #activeRoute = inject(ActivatedRoute);
  #tournamentSvc = inject(TournamentService);
  #uiHelperSvs = inject(UiHelperService);
  #participantSvc = inject(ParticipantService);
  #tournamentId = this.#activeRoute.snapshot.params['tournamentId'];
  #participantId = this.#activeRoute.snapshot.params['participantId'];
  #participantDavaSvc = inject(ParticipantDataService);

  @Output() onDelete = new EventEmitter<string>();

  participantForm = inject(FormBuilder).nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required],
    status: [PARTICIPANT_STATUS_ENUM.PLAYING],
    // profile_picture: [],
  });

  ngOnInit(): void {
    if (!this.#tournamentId) {
      return;
    }
    this.#participantDavaSvc.participantData$.subscribe((data) => {
      this.participantForm.patchValue({
        firstName: data.name.first,
        lastName: data.name.last,
        email: data.email,
        phone: data.phone,
        status: data.status,
      });
    });
  }
  updateParticipantStatus(event: any) {
    const status = this.participantForm.value.status || '';
    this.#participantSvc
      .updateParticipant(this.#tournamentId, this.#participantId, status)
      .subscribe(
        (res) => {
          console.log(`res   ---->`, res);
        },
        (err) => {
          console.log(`err -----> `, err);
        }
      );
  }

  onSubmit() {
    if (this.participantForm.invalid) {
      this.#uiHelperSvs.displaySnackbar(
        `Please fill up participant form properly`
      );
      setTimeout(() => this.#uiHelperSvs.clearSnackbarState(), 10);
      return;
    }
    const newParticipant = this.#getParticipantDetail();
  }
  backToTournamentsPage() {
    this.#navigator.navigate(['tournaments']);
  }

  #getParticipantDetail() {
    return <ParticipantItemDataModel>{
      name: <ParticipantName>{
        first: this.participantForm.value.firstName || '',
        last: this.participantForm.value.lastName || '',
      },
      email: this.participantForm.value.email,
      phone: this.participantForm.value.phone,
    };
  }
  backToParticipantsPage() {
    this.#navigator.navigate([
      'tournaments',
      this.#tournamentId,
      'participants',
    ]);
  }
  get email() {
    return this.participantForm.get('email') as FormControl;
  }
}
