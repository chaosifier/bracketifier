import { Routes } from '@angular/router';
import { TournamentListingComponent } from './tournament/tournament-listing/tournament-listing.component';
import { TournamentDetailComponent } from './tournament/tournament-detail/tournament-detail.component';
import { SigninComponent } from './signin/signin.component';
import { LayoutComponent } from './layout/layout.component';
import { authGuardGuard } from './auth-guard.guard';
import { TournamentCreateComponent } from './tournament/tournament-create/tournament-create.component';
import { TournamentUpdateComponent } from './tournament/tournament-update/tournament-update.component';
import { ParticipantCreateComponent } from './participants/participant-create/participant-create.component';
import { ParticipantListingComponent } from './participants/pariticipant-listing/pariticipant-listing.component';
import { ParticipantUpdateComponent } from './participants/participant-update/participant-update.component';

export const routes: Routes = [
  { path: '', redirectTo: 'tournaments', pathMatch: 'full' },
  {
    path: 'signin',
    loadComponent: () =>
      import("./signin/signin.component").then(
        (m) => m.SigninComponent
      )
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'tournaments',
        canActivate: [authGuardGuard],
        loadComponent: () =>
          import("./tournament/tournament-listing/tournament-listing.component").then(
            (m) => m.TournamentListingComponent
          )
      },
      {
        path: 'tournaments/create',
        loadComponent: () =>
          import("./tournament/tournament-create/tournament-create.component").then(
            (m) => m.TournamentCreateComponent
          )
      },
      {
        path: 'tournaments/:tournamentId',
        loadComponent: () =>
          import("./tournament/tournament-detail/tournament-detail.component").then(
            (m) => m.TournamentDetailComponent
          )
      },
      {
        path: 'tournaments/:tournamentId/update',
        loadComponent: () =>
          import("./tournament/tournament-update/tournament-update.component").then(
            (m) => m.TournamentUpdateComponent
          )
      },
      {
        path: 'tournaments/:tournamentId/participants',
        loadComponent: () =>
          import("./participants/pariticipant-listing/pariticipant-listing.component").then(
            (m) => m.ParticipantListingComponent
          )
      },
      {
        path: 'tournaments/:tournamentId/participants/create',
        loadComponent: () =>
          import("./participants/participant-create/participant-create.component").then(
            (m) => m.ParticipantCreateComponent
          )
      },
      {
        path: 'tournaments/:tournamentId/participants/:participantId/update',
        loadComponent: () =>
          import("./participants/participant-update/participant-update.component").then(
            (m) => m.ParticipantUpdateComponent
          )
      },
    ],
  },
];