
export class MatchDTO {
  gameCreation: number;
  gameDuration: number;
  gameId: number;
  gameMode: string; // TODO typ enum
  gameType: string; // TODO typ enum
  gameVersion: string;
  mapId: number;
  participantIdentities: Array<any>; // TODO typ
  participants: Array<any>; // TODO typ
  platformId: string;
  queueId: number;
  seasonId: number;
  teams: Array<any>; // TODO typ
}
