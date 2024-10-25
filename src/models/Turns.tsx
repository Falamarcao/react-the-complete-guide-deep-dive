import { Symbols } from './Symbols';

export interface Turn {
  square: { row: number; col: number };
  player: Symbols;
}

export type Turns = Turn[];
