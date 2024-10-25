import { Players } from '../models/Players';
import { Turns } from '../models/Turns';

interface LogProps {
  players: Players;
  turns: Turns;
}

const Log = ({ players, turns }: LogProps) => {
  return (
    <ol id="log">
      {turns.map((turn) => (
        <li key={`${turn.square.row}${turn.square.col}`}>
          {players[turn.player]} selected {turn.square.row}, {turn.square.col}
        </li>
      ))}
    </ol>
  );
};

export default Log;
