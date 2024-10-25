import { useState } from 'react';

import GameBoard from './components/GameBoard';
import Log from './components/Log';
import Player from './components/Player';

import { INITIAL_GAME_BOARD, WINNING_COMBINATIONS } from './const';

import { Symbols } from './models/Symbols';
import { Turns } from './models/Turns';
import GameOver from './components/GameOver';

function App() {
  const [players, setPlayers] = useState({
    [Symbols.X]: 'Player 1',
    [Symbols.O]: 'Player 2',
  });
  const [gameTurns, setGameTurns] = useState<Turns>([]);

  const deriveActivePlayer = (gameTurns: Turns) => {
    let currentPlayer = Symbols.X;

    if (gameTurns[0]?.player === Symbols.X) currentPlayer = Symbols.O;

    return currentPlayer;
  };

  const activePlayerSymbol = deriveActivePlayer(gameTurns);

  // const gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];
  const gameBoard = structuredClone(INITIAL_GAME_BOARD);

  // Convert game turns into a board.
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  // Check symbols in the squares and compare to find a winner.
  let winner: string | undefined;
  for (const combination of WINNING_COMBINATIONS) {
    const first = gameBoard[combination[0].row][combination[0].col];
    const second = gameBoard[combination[1].row][combination[1].col];
    const third = gameBoard[combination[2].row][combination[2].col];

    if (first && first === second && first === third) {
      winner = players[first];
      break;
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  const handleSelectSquare = (rowIndex: number, colIndex: number) => {
    setGameTurns((prevTurns) => {
      let currentPlayer = deriveActivePlayer(prevTurns);

      if (prevTurns[0]?.player === Symbols.X) currentPlayer = Symbols.O;

      const updatedTurns: Turns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  };

  const handleRematch = () => setGameTurns([]);

  const handlePlayerNameChange = (symbol: Symbols, newName: string) => {
    setPlayers((prevPlayers) => ({ ...prevPlayers, [symbol]: newName }));
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          {Object.values(Symbols).map((symbol) => (
            <Player
              key={symbol}
              name={players[symbol]}
              symbol={Symbols.X}
              isActive={activePlayerSymbol === symbol}
              onChangeName={handlePlayerNameChange}
            />
          ))}
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
