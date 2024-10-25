import { useState } from 'react';

import { Symbols } from '../models/Symbols';

type Board = Array<Array<Symbols | null>>;

const initialGameBoard: Board = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

interface GameBoardProps {
  onSelectSquare: () => void;
  activePlayerSymbol: Symbols;
}

const GameBoard = ({ onSelectSquare, activePlayerSymbol }: GameBoardProps) => {
  const [gameBoard, setGameBoard] = useState<Board>(initialGameBoard);

  const handlePlay = (
    rowIndex: number,
    colIndex: number,
    symbol: Symbols | null
  ) => {
    setGameBoard((prevGameBoard: Board) => {
      // Making a copy of the game board
      // Node: Arrays pass by reference, so we need a copy to avoid dealing with bugs.
      const gameBoard = [...prevGameBoard.map((innerArray) => [...innerArray])];
      gameBoard[rowIndex][colIndex] = symbol;
      return gameBoard;
    });
    onSelectSquare();
  };

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() =>
                    handlePlay(rowIndex, colIndex, activePlayerSymbol)
                  }
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
};

export default GameBoard;
