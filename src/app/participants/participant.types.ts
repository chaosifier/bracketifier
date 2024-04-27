export interface Participant {
  name: ParticipantName;
  email: string;
  phone: string;
  status: PARTICIPANT_STATUS_ENUM;
}

export interface ParticipantName {
  first: string;
  last: string;
}

export enum PARTICIPANT_STATUS_ENUM {
  PLAYING = 'PLAYING',
  WITHDREW = 'WITHDREW',
  PENDING = 'PENDING',
}

export interface ParticipantItemDataModel {
  _id: string;
  email: string;
  phone: string;
  status?: PARTICIPANT_STATUS_ENUM;
  name: ParticipantName;
}
