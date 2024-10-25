import { useState } from 'react';

import GameBoard from './components/GameBoard';
import GameOver from './components/GameOver';
import Log from './components/Log';
import Player from './components/Player';

import { Symbols } from './models/Symbols';
import { Game } from './models/Game';

function App() {
  const [game, setGame] = useState<Game>(
    new Game({
      [Symbols.X]: 'Player 1',
      [Symbols.O]: 'Player 2',
    })
  );

  const handleSelectSquare = (rowIndex: number, colIndex: number) => {
    setGame((prevGame: Game) => {
      const newGame = new Game({ ...prevGame.players }, [...prevGame.turns]);
      newGame.addTurn(rowIndex, colIndex);
      return newGame;
    });
  };

  const handleRematch = () => {
    setGame((prevGame: Game) => {
      const newGame = new Game({ ...prevGame.players });
      newGame.reset();
      return newGame;
    });
  };

  const handlePlayerNameChange = (symbol: Symbols, newName: string) => {
    setGame((prevGame: Game) => {
      const newGame = new Game({ ...prevGame.players }, [...prevGame.turns]);
      newGame.changePlayerName(symbol, newName);
      return newGame;
    });
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          {Object.values(Symbols).map((symbol) => (
            <Player
              key={symbol}
              name={game.players[symbol]}
              symbol={symbol}
              isActive={game.activePlayerSymbol === symbol}
              onChangeName={handlePlayerNameChange}
            />
          ))}
        </ol>
        {(game.winner || game.hasDraw) && (
          <GameOver onClickRematch={handleRematch} winner={game.winner} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={game.board} />
      </div>
      <Log players={game.players} turns={game.turns} />
    </main>
  );
}

export default App;
