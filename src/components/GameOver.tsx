import { capitalizeString } from '../utils/Capitalize';

interface GameOverProps {
  winner: string | undefined;
  onClickRematch: () => void;
}

const GameOver = ({ winner, onClickRematch }: GameOverProps) => {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {winner ? <p>{capitalizeString(winner)} won!</p> : <p>It's a draw</p>}
      <p>
        <button onClick={onClickRematch}>Rematch!</button>
      </p>
    </div>
  );
};

export default GameOver;
