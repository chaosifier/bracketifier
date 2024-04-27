import { ParticipantItemDataModel } from "../participants/participant.types";

export interface TournamentCreateUpdateRequestModel {
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  max_participants: number;
  type: string;
}

export enum TOURNAMENT_STATUS_ENUM {
  UPCOMING = 'UPCOMING',
  ONGOING = 'ONGOING',
  CANCELLED = 'CANCELLED',
  ENDED = 'ENDED',
}

export enum TOURNAMENT_TYPE {
  SINGLE_ELIMINATION = 'SINGLE_ELIMINATION',
  DOUBLE_ELIMINATION = 'DOUBLE_ELIMINATION',
  ROUND_ROBIN = 'ROUND_ROBIN',
  GROUP_STAGE = 'GROUP_STAGE',
}

export enum EVENT_STATUS {
  SCHEDULED = 'SCHEDULED',
  CANCELLED = 'CANCELLED',
  ENDED = 'ENDED',
  ONGOING = 'ONGOING'
};

export interface TournamentItemDataModel {
  created_by: CreatedBy;
  _id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  max_participants: number;
  type: TOURNAMENT_TYPE;
  status: string;
  __v: number;
  participants: ParticipantItemDataModel[]
  events: Event[]
}

export interface CreatedBy {
  name: Name;
  _id: string;
  email: string;
}

export interface Name {
  first: string;
  last: string;
}

export interface Event {
  _id?: string
  tournament_id: string
  status: string
  start_date: string
  end_date: string
  teams: Team[]
  round_number: number
  score: any[]
  parent_event_id?: string
}

export interface Team {
  status: string
  players: Player[]
  _id: string
}

export interface Player {
  name: Name
  email: string
  phone: string
  _id: string
}

export interface EventRound{
  round_number: number,
  round_name: string,
  events: Array<Event>
}

export enum EVENT_TEAM_RESULT {
  WON = 'WON',
  LOST = 'LOST',
  CONCEDED = 'CONCEDED',
  UNDECIDED = 'UNDECIDED'
};