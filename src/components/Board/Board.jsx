import React, { Component }from 'react'
import PropTypes from 'prop-types';
import './Board.css'
import Square from './../Square/Square'
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

  constructor() {
    super()
    this.state =
      Object.assign(
        {},
        this.getInitialState()
      );
  }

  getInitialState() {
    return {
      board : this.createBoard(),
      tiles : [ 'a','a','a','a','a','a','a','a','a',
      'b','b','c','c','d','d','d','d','e',
      'e','e','e','e','e','e','e','e','e',
      'e','e','f','f','g','g','g','h','h',
      'i','i','i','i','i','i','i','i','i',
      'j','k','l','l','l','l','m','m','n',
      'n','n','n','n','n','o','o','o','o',
      'o','o','o','o','p','p','q','r','r',
      'r','r','r','r','s','s','s','s','t',
      't','t','t','t','t','u','u','u','u',
      'v','v','w','w','x','y','y','z',' ',
      ' ']
    };
  }

  createBoard(size) {
    var board = []
    for(var i = 0; i < 15; i++) {
      board.push(new Array(15).fill(0))
    }
    return board
  }

  renderSquare(i) {
    const x = i % 15;
    const y = Math.floor(i / 15 );
    // const black = (x + y) % 2 === 1;

    const [tileX, tileY] = this.props.tilePosition;
    const tile = (x === tileX && y === tileY) ? <Tile /> : null;


    return (
        <BoardSquare key={i} handleSquareClick={this.handleSquareClick} x={x} y={y}>{this.renderTile(x,y)}</BoardSquare>
    )
  }

  renderTile(x,y) {
    const [tileX, tileY] = this.props.tilePosition;
    if (x === tileX && y === tileY) return <Tile />
  }

  handleSquareClick(toX, toY) {
    moveTile(toX, toY);
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

export default DragDropContext(HTML5Backend)(Board);

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