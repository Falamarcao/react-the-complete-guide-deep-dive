import { Coordinate } from './Coordinate';
import { Symbols } from './Symbols';

export interface Turn {
  square: Coordinate;
  player: Symbols;
}

export type Turns = Turn[];
