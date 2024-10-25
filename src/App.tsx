import { useState } from 'react';

import GameBoard from './components/GameBoard';
import Log from './components/Log';
import Player from './components/Player';

import { INITIAL_GAME_BOARD, WINNING_COMBINATIONS } from './const';

import { Symbols } from './models/Symbols';
import { Turns } from './models/Turns';

function App() {
  const [gameTurns, setGameTurns] = useState<Turns>([]);

  const deriveActivePLayer = (gameTurns: Turns) => {
    let currentPlayer = Symbols.X;

    if (gameTurns[0]?.player === Symbols.X) currentPlayer = Symbols.O;

    return currentPlayer;
  };

  const activePlayerSymbol = deriveActivePLayer(gameTurns);

  const gameBoard = INITIAL_GAME_BOARD;

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  const handleSelectSquare = (rowIndex: number, colIndex: number) => {
    setGameTurns((prevTurns) => {
      let currentPlayer = deriveActivePLayer(prevTurns);

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
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
