// import { useState } from 'react';

import { Symbols } from '../models/Symbols';
import { Turns } from '../models/Turns';

type Board = Array<Array<Symbols | null>>;

const initialGameBoard: Board = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

interface GameBoardProps {
  onSelectSquare: (rowIndex: number, colIndex: number) => void;
  turns: Turns;
}

const GameBoard = ({ onSelectSquare, turns }: GameBoardProps) => {
  //   const [gameBoard, setGameBoard] = useState<Board>(initialGameBoard);

  //   const handlePlay = (
  //     rowIndex: number,
  //     colIndex: number,
  //     symbol: Symbols | null
  //   ) => {
  //     setGameBoard((prevGameBoard: Board) => {
  //       // Making a copy of the game board
  //       // Node: Arrays pass by reference, so we need a copy to avoid dealing with bugs.
  //       const gameBoard = [...prevGameBoard.map((innerArray) => [...innerArray])];
  //       gameBoard[rowIndex][colIndex] = symbol;
  //       return gameBoard;
  //     });
  //     onSelectSquare();
  //   };

  const gameBoard: Board = initialGameBoard;

  for (const turn of turns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => onSelectSquare(rowIndex, colIndex)}>
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
