import { GameStatus } from "./GameStatus";

export interface GameDetails {
  id: string;

  player1Id: string;
  player2Id: string;

  player1Name: string;
  player2Name: string;

  opponentPlayerNumber: number;

  status: GameStatus;
}
