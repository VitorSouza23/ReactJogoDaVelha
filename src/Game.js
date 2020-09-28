import React, { useState } from 'react';
import Board from './Board';
import { calculateWinner, setWinnerStatus } from './Winner';

function Game(props) {
    const [_history, setHistory] = useState([{
        squares: Array(9).fill(null)
    }]);
    const [_stepNumber, setStepNumber] = useState(0);
    const [_xIsNext, setXIsNext] = useState(true);

    const handleClick = (i) => {
        const history = _history.slice(0, _stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = _xIsNext ? 'X' : 'O';
        setHistory(history.concat([{
            squares: squares
        }]));
        setStepNumber(history.length);
        setXIsNext(!_xIsNext);
    }

    const jumpTo = (step) => {
        setStepNumber(step);
        setXIsNext((step % 0) === 0);
    }

    const mapMoves = (history) => {
        return history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move : 'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => jumpTo(move)}>{desc}</button>
                </li>
            );
        });
    }

    const history = _history;
    const current = history[_stepNumber];
    const winner = calculateWinner(current.squares);
    let status = setWinnerStatus(winner, _xIsNext);
    const moves = mapMoves(history);

    return (
        <div className="game">
            <div className="game-board">
                <Board squares={current.squares} onClick={(i) => handleClick(i)} />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
    );
}

export default Game;