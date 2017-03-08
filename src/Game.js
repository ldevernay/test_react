import React, { Component } from 'react';
import Board from './Board';
import calculateWinner from './App';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true
    };
  }
  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    const moves = history.map((step, move) => {
      const desc = move ?
      'Move #' + move :
      'Game start';
      return (
        <li key={move}>
        <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      );
    });
    return (
      <div className="game">
      <div className="game-board">
      <Board squares={current.squares} onClick={(i) => this.handleClick(i)}/>
      </div>
      <div className="game-info">
      <div>{status}</div>
      <ol>{moves}</ol>
      </div>
      </div>
    );
  }
  handleClick(i){
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      xIsNext: !this.state.xIsNext,
    });
  }
}

export default Game;
