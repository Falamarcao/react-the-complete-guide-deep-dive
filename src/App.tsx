import { useState } from 'react';

import GameBoard from './components/GameBoard';
import Log from './components/Log';
import Player from './components/Player';

import { Symbols } from './models/Symbols';
import { Turns } from './models/Turns';

function App() {
  const [gameTurns, setGameTurns] = useState<Turns>([]);
  const [activePlayerSymbol, setActivePlayerSymbol] = useState(Symbols.X);

  const handleSelectSquare = (rowIndex: number, colIndex: number) => {
    setActivePlayerSymbol((prevSymbol) =>
      prevSymbol === Symbols.X ? Symbols.O : Symbols.X
    );

    setGameTurns((prevTurns) => {
      let currentPlayer = Symbols.X;

      if (prevTurns[0]?.player === Symbols.X) currentPlayer = Symbols.O;

      const updatedTurns: Turns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
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
        <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
      </div>
      <Log />
    </main>
  );
}

export default App;
