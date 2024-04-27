import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  FormGroup,
  FormsModule,
  Validators,
  FormControl,
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
import { UiHelperService } from '../../services/ui-helper.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ParticipantService } from '../participant.service';
import {
  PARTICIPANT_STATUS_ENUM,
  ParticipantItemDataModel,
  ParticipantName,
} from '../participant.types';

@Component({
  selector: 'app-participant-create',
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
  templateUrl: `./participant-create.component.html`,
  styleUrl: `./participant-create.component.css`,
})
export class ParticipantCreateComponent {
  #participantSvc = inject(ParticipantService);
  #uiHelperSvs = inject(UiHelperService);
  #navigator = inject(Router);
  #activeRoute = inject(ActivatedRoute);
  #tournamentId = this.#activeRoute.snapshot.params['tournamentId'];

  participantForm = inject(FormBuilder).nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required],
    status: [PARTICIPANT_STATUS_ENUM.PLAYING],
    profile_picture: [],
  });

  onSubmit() {
    if (this.participantForm.invalid) {
      this.#uiHelperSvs.displaySnackbar(
        `Please fill up participant form properly`
      );
      setTimeout(() => this.#uiHelperSvs.clearSnackbarState(), 10);
      return;
    }
    const newParticipant = this.#getParticipantDetail();

    this.#participantSvc
      .createParticipant(this.#tournamentId, newParticipant)
      .subscribe((res) => {
        this.#uiHelperSvs.displaySnackbar(
          `New participant ${newParticipant.name.first} ${newParticipant.name.first} is created`
        );
        setTimeout(() => {
          this.#uiHelperSvs.clearSnackbarState();
          this.backToParticipantsPage();
        }, 10);
      });
  }

  backToParticipantsPage() {
    this.#navigator.navigate([
      'tournaments',
      this.#tournamentId,
      'participants',
    ]);
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

  get email() {
    return this.participantForm.get('email') as FormControl;
  }
}
