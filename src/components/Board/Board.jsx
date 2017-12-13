import React, { Component }from 'react';
import PropTypes from 'prop-types';
import './Board.css';
import Tile from './../Tile/Tile';
import BoardSquare from './../BoardSquare/BoardSquare';

class Board extends Component {
  static propTypes = {
    tilePosition: PropTypes.arrayOf(
      PropTypes.number.isRequired
    ).isRequired
  }

  renderSquare(i) {
    const x = i % 15;
    const y = Math.floor(i / 15 );

    return (
        <BoardSquare 
          key={i} x={x} y={y} 
          updateBoard={this.props.updateBoard } 
          removeFromRack={this.props.removeFromRack}
          isSquareOccupied={this.props.isSquareOccupied}
          firstTurn={this.props.firstTurn}
        >
          {this.renderTile(x,y)}
        </BoardSquare>
    )
  }

  renderTile(x,y) {
    const boardLetter = this.props.board[y][x]
    const moveableTile = this.props.tempBoard[y][x]
    if(boardLetter !== 0) {
      return <div className='tile'>{boardLetter.toUpperCase()}</div>
    }else if(moveableTile !== 0) {   
      return <Tile updateCurrentLetter={this.props.updateCurrentLetter} letter={moveableTile} tilePosition={this.props.tilePosition} updatePerviousPosition={this.props.updatePerviousPosition}/>
    }
  }

  render() {
    const rows = [];
    let count = 0;
    for(let i = 0; i < 15; i++) {
      const squares = [];
      for (let j = 0; j < 15; j++) {
        squares.push(this.renderSquare(count));
        count++;
      }
      rows.push(<tr key={i}>{squares}</tr>)
    }

    return (
        <table>
          <tbody>
            {rows}
          </tbody>
        </table>
    )
  }
}

export default Board;
