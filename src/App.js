import React, { Component } from 'react';
import './App.css';
import Board from './components/Board/Board'

class App extends Component {

  constructor() {
    super()
    this.state = {
      board : this.createBoard(15),
      titles : {
        a: 4,
        b: 3,
        c: 4
      }
    }
  }

  createBoard(size) {
    var m = [];
    for (var i = 0; i < size; i++) {
        m[i] = [];
        for (var j = 0; j < size; j++)
            m[i][j] = 0;
    }
    return m;
};

  render() {
    return (
    <div>
      <Board board={this.state.board}/>
      <table className='players-tiles'>
        <tbody>
        <tr>
          <td>A</td>
          <td>B</td>
          <td>A</td>
          <td>P</td>
          <td>Q</td>
          <td>T</td>
          <td>Z</td>
        </tr>
      </tbody>
    </table>
  </div>
    );
  }
}

export default App;
