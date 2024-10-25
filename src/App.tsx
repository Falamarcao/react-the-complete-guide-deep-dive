import { useState } from 'react';

import GameBoard from './components/GameBoard';
import Log from './components/Log';
import Player from './components/Player';

import { INITIAL_GAME_BOARD, WINNING_COMBINATIONS } from './const';

import { Symbols } from './models/Symbols';
import { Turns } from './models/Turns';
import GameOver from './components/GameOver';

function App() {
  const [gameTurns, setGameTurns] = useState<Turns>([]);

  const deriveActivePLayer = (gameTurns: Turns) => {
    let currentPlayer = Symbols.X;

    if (gameTurns[0]?.player === Symbols.X) currentPlayer = Symbols.O;

    return currentPlayer;
  };

  const activePlayerSymbol = deriveActivePLayer(gameTurns);

  // const gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];
  const gameBoard = structuredClone(INITIAL_GAME_BOARD);

  // Convert game turns into a board.
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  // Check symbols in the squares and compare to find a winner.
  let winner: Symbols | undefined;
  for (const combination of WINNING_COMBINATIONS) {
    const first = gameBoard[combination[0].row][combination[0].col];
    const second = gameBoard[combination[1].row][combination[1].col];
    const third = gameBoard[combination[2].row][combination[2].col];

    if (first && first === second && first === third) {
      winner = first;
      break;
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

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

  const handleRematch = () => setGameTurns([]);

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
        {(winner || hasDraw) && (
          <GameOver onClickRematch={handleRematch} winner={winner} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
