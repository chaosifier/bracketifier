import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ParticipantItemDataModel } from './participant.types';

@Injectable({
  providedIn: 'root',
})
export class ParticipantService {
  #http = inject(HttpClient);

  deleteParticipant(tournamentId: string, participantId: string) {
    const url = this.#join([
      environment.apiUrl,
      environment.tournamentApiPaths.delete,
      tournamentId,
      environment.participantApiPaths.delete,
      participantId,
    ]);
    return this.#http.delete<any>(url);
  }
  createParticipant(
    tournamentId: string,
    participant: ParticipantItemDataModel
  ) {
    const url = this.#join([
      environment.apiUrl,
      environment.tournamentApiPaths.create,
      tournamentId,
      environment.participantApiPaths.create,
    ]);
    return this.#http.post<any>(url, {
      name: participant.name,
      email: participant.email,
      phone: participant.phone,
    });
  }

  //PATCH http://localhost:3000/tournaments/{{TOURNAMENT_ID}}/participants/update-status
  updateParticipant(
    tournamentId: string,
    participantId: string,
    status: string
  ) {
    const url = this.#join([
      environment.apiUrl,
      environment.tournamentApiPaths.update,
      tournamentId,
      environment.participantApiPaths.update,
      'update-status',
    ]);
    const body = {
      userId: participantId,
      status: status,
    };
    return this.#http.patch<any>(url, body);
  }

  #join(parts: Array<string>) {
    return parts.join('/');
  }
}
