import rawData from '../../matches.json';

export interface Competition {
  name: string;
  edition: string;
  hosts: string[];
  start: string;
  end: string;
  teams: number;
  matches: number;
  groups: number;
  final_venue: string;
  final_city: string;
}

export interface Group {
  color: string;
  teams: string[];
}

export interface Team {
  flag: string;
  confederation: string;
}

export interface Stadium {
  city: string;
  country: string;
  capacity: number;
  images?: string[];
}

export interface MatchScore {
  home: number;
  away: number;
}

export interface Match {
  id: number;
  date: string;
  time_brt: string;
  group: string;
  home: string;
  away: string;
  stadium: string;
  score: MatchScore | null;
  status: string;
}

interface RawMatch extends Omit<Match, 'score'> {
  score: MatchScore | null;
}

interface DataShape {
  competition: Competition;
  groups: Record<string, Group>;
  teams: Record<string, Team>;
  stadiums: Record<string, Stadium>;
  matches: RawMatch[];
}

const data = rawData as DataShape;

export const competition = data.competition;
export const groups = data.groups;
export const teams = data.teams;
export const stadiums = data.stadiums;
export const matches: Match[] = data.matches.map((match) => ({
  ...match,
  score: match.score ?? null,
}));
