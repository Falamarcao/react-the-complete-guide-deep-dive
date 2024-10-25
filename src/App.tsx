import { useState } from 'react';

import GameBoard from './components/GameBoard';
import Player from './components/Player';
import Log from './components/Log';

import { Symbols } from './models/Symbols';

function App() {
  const [activePlayerSymbol, setActivePlayerSymbol] = useState(Symbols.X);

  const handleSelectSquare = () => {
    setActivePlayerSymbol((prevSymbol) =>
      prevSymbol === Symbols.X ? Symbols.O : Symbols.X
    );
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name="Player 1"
            symbol={Symbols.X}
            isActive={activePlayerSymbol === Symbols.X}
          />
          <Player
            name="Player 2"
            symbol={Symbols.O}
            isActive={activePlayerSymbol === Symbols.O}
          />
        </ol>
        <GameBoard
          onSelectSquare={handleSelectSquare}
          activePlayerSymbol={activePlayerSymbol}
        />
      </div>
      <Log />
    </main>
  );
}

export default App;
