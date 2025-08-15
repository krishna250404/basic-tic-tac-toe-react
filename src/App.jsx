import React, { useState, useEffect } from 'react';
import './index.css';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);

  const { winner, winningLine } = calculateWinner(board);

  // Increment counters when a player wins
  useEffect(() => {
    if (winner === 'X') {
      setXWins(prev => prev + 1);
    } else if (winner === 'O') {
      setOWins(prev => prev + 1);
    }
  }, [winner]);

  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const renderSquare = (index) => {
    let className = 'square';
    if (winningLine && winningLine.includes(index)) {
      className += winner === 'X' ? ' winner-x' : ' winner-o';
    }
    return (
      <button className={className} onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    );
  };

  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${isXNext ? 'X' : 'O'}`;

  return (
    <div className="game">
      <div className="status">{status}</div>

      {/* Scoreboard */}
      <div className="scoreboard">
        <span>X Wins: {xWins}</span>
        <span>O Wins: {oWins}</span>
      </div>

      {/* Game Board */}
      <div className="board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>

      {/* Reset Button */}
      <button className="reset-btn" onClick={resetGame}>Reset Game</button>

      {/* Winner Pop-up */}
      {winner && (
        <div className="popup">
          <div className="popup-content">
            <h2>{winner} wins!</h2>
            <button onClick={resetGame}>Play Again</button>
          </div>
        </div>
      )}
    </div>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], winningLine: [a, b, c] };
    }
  }
  return { winner: null, winningLine: null };
};

export default TicTacToe;
