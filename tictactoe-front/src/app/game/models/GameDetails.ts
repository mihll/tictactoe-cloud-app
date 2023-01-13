import { GameStatus } from "./GameStatus";
import { BoardSquare } from "./BoardSquare";

export interface GameDetails {
  id: string;

  player1Id: string;
  player2Id: string;

  player1Name: string;
  player2Name: string;

  opponentPlayerNumber: number;

  status: GameStatus;

  board: BoardSquare[];

  currentPlayerNumber: number;
}
