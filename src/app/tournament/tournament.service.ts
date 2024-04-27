import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Event, TournamentCreateUpdateRequestModel, TournamentItemDataModel } from './tournament.types';
import { PaginationRequestQueryModel } from '../models/common-types';
import { StandardResponseModel } from '../models/login-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TournamentService {
  #http = inject(HttpClient);

  create(tournament: TournamentCreateUpdateRequestModel) {
    const url = this.#join([environment.apiUrl, environment.tournamentApiPaths.create]);
    return this.#http.post<any>(url, tournament);
  }

  update(tournamentId: string, tournament: TournamentCreateUpdateRequestModel) {
    const url = this.#join([environment.apiUrl, environment.tournamentApiPaths.update, tournamentId]);
    return this.#http.patch<any>(url, tournament);
  }

  delete(tournamentId: string) {
    const url = this.#join([environment.apiUrl, environment.tournamentApiPaths.delete, tournamentId]);
    return this.#http.delete<any>(url);
  }

  generateBracket(tournamentId: string) {
    const url = this.#join([environment.apiUrl, environment.tournamentApiPaths.delete, tournamentId, environment.eventsApiPaths.base, environment.eventsApiPaths.generateBracket]);
    return this.#http.post<StandardResponseModel>(url, {});
  }

  getById(tournamentId: string): Observable<StandardResponseModel<TournamentItemDataModel>> {
    const url = this.#join([environment.apiUrl, environment.tournamentApiPaths.getById, tournamentId]);
    return this.#http.get<StandardResponseModel<TournamentItemDataModel>>(url);
  }

  getTournamentsToManage(filter: PaginationRequestQueryModel): Observable<StandardResponseModel<TournamentItemDataModel[]>> {
    const url = this.#join([environment.apiUrl, environment.tournamentApiPaths.getMy]) + `?pageSize=${filter.pageSize}&pageNumber=${filter.pageNumber}`;
    return this.#http.get<StandardResponseModel<TournamentItemDataModel[]>>(url);
  }

  #join(parts: Array<string>) {
    return parts.join('/');
  }

  updateEvent(tournamentId: string, event: Event): Observable<StandardResponseModel> {
    const url = this.#join([environment.apiUrl, environment.tournamentApiPaths.update, tournamentId, environment.eventsApiPaths.update, event._id ? event._id : ""]);
    return this.#http.patch<any>(url, event);
  }
}