import { Component, inject, signal } from '@angular/core';
import { TournamentService } from '../tournament.service';
import { TournamentItemCardComponent } from '../tournament-item-card/tournament-item-card.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AsyncPipe } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { TournamentCreateComponent } from '../tournament-create/tournament-create.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tournament-listing',
  standalone: true,
  imports: [
    TournamentItemCardComponent,
    MatPaginatorModule,
    AsyncPipe,
    MatListModule,
    TournamentItemCardComponent,
    MatPaginatorModule,
    TournamentCreateComponent,
  ],
  templateUrl: './tournament-listing.component.html',
  styleUrl: './tournament-listing.component.css',
})
export class TournamentListingComponent {
  #defaultFilter = { pageSize: 20, pageNumber: 1 };
  #tournamentSvc = inject(TournamentService);
  #navigator = inject(Router);
  tournaments$ = this.#tournamentSvc.getTournamentsToManage(
    this.#defaultFilter
  );

  refreshData() {
    this.tournaments$ = this.#tournamentSvc.getTournamentsToManage(
      this.#defaultFilter
    );
  }
  addNewTournament() {
    this.#navigator.navigate(['tournaments/create']);
  }
}
