import { Component, Signal, effect, inject, signal } from '@angular/core';
import { TournamentService } from '../tournament.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { StandardResponseModel } from '../../models/login-response';
import { EVENT_TEAM_RESULT, Event, EventRound, Team, TournamentItemDataModel } from '../tournament.types';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { TournamentEventItemUpdateDialogue } from '../tournament-event-item-update-dialogue/tournament-event-item-update-dialogue.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-tournament-detail',
  standalone: true,
  imports: [DatePipe, MatButtonModule],
  templateUrl: "./tournament-detail.component.html",
  styleUrl: "./tournament-detail.component.css"
})
export class TournamentDetailComponent {
  #tournamentSvc = inject(TournamentService);
  #navigator = inject(Router);
  #tournamentId: string = '';
  tournamentDetail$ = signal<TournamentItemDataModel | null>(null);
  rounds$ = signal<Array<EventRound>>([]);

  constructor(public updateEventDialogue: MatDialog, private route: ActivatedRoute) {
    effect(() => {
      console.log('tournamentDetail$', this.tournamentDetail$);
    })
  }

  ngOnInit() {
    this.route.params.subscribe((param: Params) => {
      this.#tournamentId = param['tournamentId'];
      if (this.#tournamentId) {
        this.refreshData();
      }
    });
  }

  goToTournaments() {
    this.#navigator.navigate(['tournaments']);
  }

  openEventUpdateDialogue(event: Event) {
    const dialogRef = this.updateEventDialogue.open(TournamentEventItemUpdateDialogue, {
      width: '300px',
      height: '400px',
      data: {
        tournamentId: this.#tournamentId,
        event: event
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);

      if (result === 'saved')
        this.refreshData();
    });
  }

  getTeamItemClass(team: Team): string {
    let classes = ["tournament-bracket__team"];
    if (team && team.status === EVENT_TEAM_RESULT.WON)
      classes.push("tournament-bracket__team--winner");

    return classes.join(" ");
  }

  getEventItemClass(event: Event): string {
    let classes = ["tournament-bracket__match"];
    classes.push(`tournament-bracket__match--${event.status.toLowerCase()}`);

    return classes.join(" ");
  }

  refreshData() {
    this.#tournamentSvc.getById(this.#tournamentId).subscribe((d) => {
      if (d.success) {
        this.tournamentDetail$.set(d.data);

        let rounds: EventRound[] = [];
        let totalRounds = Math.log2(d.data.participants.length);
        for (let r = 1; r <= totalRounds; r++) {
          let roundName = r == totalRounds ? "Final Round" : `Round ${r}`;
          rounds.push({
            round_name: roundName,
            round_number: r,
            events: d.data.events.filter(e => e.round_number == r)
          });
        }
        let finalEvent = rounds[totalRounds - 1].events[0];
        console.log('finalEvent', finalEvent);
        rounds.push({
          round_name: "Champion",
          round_number: 0,
          events: [finalEvent]
        });
        this.rounds$.set(rounds);
      }
    });
  }
}
