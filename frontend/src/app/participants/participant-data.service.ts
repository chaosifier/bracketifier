import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ParticipantDataService {
  #dataSubject = new BehaviorSubject<any>(null);
  participantData$ = this.#dataSubject.asObservable();

  sendData(data: any) {
    this.#dataSubject.next(data);
  }
}
