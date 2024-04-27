import { Component, inject, OnInit } from '@angular/core';
import { ParticipantItemCardComponent } from '../participant-item-card/participant-item-card.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ParticipantCreateComponent } from '../participant-create/participant-create.component';
import { MatListModule } from '@angular/material/list';
import { AsyncPipe } from '@angular/common';
import { ParticipantService } from '../participant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Participant } from '../participant.types';
import { TournamentService } from '../../tournament/tournament.service';

@Component({
  selector: 'app-pariticipant-listing',
  standalone: true,
  imports: [
    ParticipantItemCardComponent,
    MatPaginatorModule,
    AsyncPipe,
    MatListModule,
    MatPaginatorModule,
    ParticipantCreateComponent,
  ],
  templateUrl: './participant-listing.component.html',
  styleUrl: './participant-listing.component.css',
})
export class ParticipantListingComponent {
  #defaultFilter = { pageSize: 20, pageNumber: 1 };
  #particpantSvc = inject(ParticipantService);
  #tournamentSvc = inject(TournamentService);
  #navigator = inject(Router);
  #activatedRoute = inject(ActivatedRoute);

  tournamentId = this.#activatedRoute.snapshot.params['tournamentId'];
  tournament$ = this.#tournamentSvc.getById(this.tournamentId);

  // tournaments$ = this.#tournamentSvc.getTournamentsToManage(
  //   this.#defaultFilter
  // );

  refreshData() {
    this.tournament$ = this.#tournamentSvc.getById(this.tournamentId);
  }
  // addNewTournament() {
  //   this.#navigator.navigate(['tournaments/create']);
  // }
  //POST http://localhost:3000/tournaments/{{TOURNAMENT_ID}}/participants
  addParticipant() {
    this.#navigator.navigate([
      'tournaments',
      this.tournamentId,
      'participants',
      'create',
    ]);
  }

  goBackTournament() {
    this.#navigator.navigate(['tournaments', this.tournamentId, 'update']);
  }
}
