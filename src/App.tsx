import Player from './components/Player';
import GameBoard from './components/GameBoard';

import { Symbols } from './models/Symbols';

function App() {
  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player name="Player 1" symbol={Symbols.X} />
          <Player name="Player 2" symbol={Symbols.O} />
        </ol>
        <GameBoard />
      </div>
    </main>
  );
}

export default App;
