import { Symbols } from './Symbols';
import { Turns } from './Turns';
import { Board } from './Board';
import { Players } from './Players';

import { INITIAL_GAME_BOARD, WINNING_COMBINATIONS } from '../const';

export class Game {
  private _players: Players;
  private _turns: Turns;
  private _board: Board;
  private _winner: string | undefined;

  constructor(players: Players, turns: Turns) {
    this._players = players;
    this._turns = turns;
    this._board = structuredClone(INITIAL_GAME_BOARD);
  }

  reset() {
    this._turns = [];
    this._board = structuredClone(INITIAL_GAME_BOARD); // Reset board too
    this._winner = undefined;
  }

  get players(): Players {
    return this._players;
  }

  get turns(): Turns {
    return this._turns;
  }

  get winner(): string | undefined {
    if (this._winner) return this._winner;

    for (const combination of WINNING_COMBINATIONS) {
      const [first, second, third] = combination.map(
        ({ row, col }) => this.board[row][col]
      );

      if (first && first === second && first === third) {
        this._winner = this.players[first];
        return this._winner;
      }
    }
  }

  get hasDraw(): boolean {
    return this._turns.length === 9 && !this.winner;
  }

  get board(): Board {
    const updatedBoard = structuredClone(this._board);
    this._turns.forEach(({ square, player }) => {
      updatedBoard[square.row][square.col] = player;
    });
    return updatedBoard;
  }

  get activePlayerSymbol(): Symbols {
    return this._turns[0]?.player === Symbols.X ? Symbols.O : Symbols.X;
  }

  addTurn(rowIndex: number, colIndex: number): void {
    this._turns = [
      {
        square: { row: rowIndex, col: colIndex },
        player: this.activePlayerSymbol,
      },
      ...this._turns,
    ];
  }

  changePlayerName(symbol: Symbols, newName: string): void {
    this._players = { ...this.players, [symbol]: newName };
  }
}
