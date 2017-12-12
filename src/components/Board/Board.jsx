import React, { Component }from 'react'
import PropTypes from 'prop-types';
import './Board.css'
// import Square from './../Square/Square'
import Rack from './../Rack/Rack'
import Tile from './../Tile/Tile'
import BoardSquare from './../BoardSquare/BoardSquare'
import { moveTile } from './../Game/Game'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'


class Board extends Component {
  static propTypes = {
    tilePosition: PropTypes.arrayOf(
      PropTypes.number.isRequired
    ).isRequired
  }

  grabLetter(letter) {
    console.log(letter);
  }

  renderSquare(i) {
    const x = i % 15;
    const y = Math.floor(i / 15 );
    const [tileX, tileY] = this.props.tilePosition;

    return (
        <BoardSquare 
          key={i} x={x} y={y} 
          updateBoard={this.props.updateBoard } 
          removeFromRack={this.props.removeFromRack}
          isSquareOccupied={this.props.isSquareOccupied}
        >
          {this.renderTile(x,y)}
        </BoardSquare>
    )
  }

  renderTile(x,y) {
    const [tileX, tileY] = this.props.tilePosition;
    const letter = this.props.board[y][x]
    if(letter != 0) {
      return <Tile updateCurrentLetter={this.props.updateCurrentLetter} letter={letter} tilePosition={this.props.tilePosition} updatePerviousPosition={this.props.updatePerviousPosition}/>
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
      <main>
        <table>
          <tbody>
            {rows}
          </tbody>
        </table>
      </main>
    )
  }
}

export default Board;

// const Board = ({board}) => {
//   return (
//     <table>
//       <tbody>
//         {board.map((row, index) => {
//           return (
//             <tr>{
//               row.map( (square, idx) => {
//                 return (
//                   <td data-postition={[idx, index].join('-')}>{square ? square : ""}</td>
//                 )
//               })
//             }</tr>
//           )
//         })}
//       </tbody>
//     </table>
//   )
// }

// export default Board;