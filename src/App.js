import React, { Component } from 'react';
import './App.css';
import Board from './components/Board/Board'
import Rack from './components/Rack/Rack'
import { observe } from './components/Game/Game'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'


class App extends Component {

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
      playersRack : this.genTiles(),
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
      ' '],
      prevPosition : [0,0]
    };
  }

  genTiles() {
    return new Array(7).fill("")
  }

  componentDidMount() {
    let tilesCopy = [...this.state.tiles];
    let rack = [];
    this.state.playersRack.map( tileIdx => {
      let randomNum = Math.floor(Math.random() * tilesCopy.length);
      rack.push(tilesCopy[randomNum])
      tilesCopy.splice(randomNum, 1)
    })
    this.setState({
      tiles : tilesCopy,
      playersRack : rack
    })
  }

  createBoard(size) {
    var board = []
    for(var i = 0; i < 15; i++) {
      board.push(new Array(15).fill(0))
    }
    return board
  }

  updateBoard = (y, x) => {
    let boardCopy = this.state.board.slice();
    console.log(this.state.prevPosition, boardCopy[this.state.prevPosition[0]][this.state.prevPosition[1]])
    if(boardCopy[this.state.prevPosition[0]][this.state.prevPosition[1]] === this.props.letter) {
      boardCopy[this.state.prevPosition[0]][this.state.prevPosition[1]] = 0
    }
    console.log(boardCopy)
    boardCopy[y][x] = this.props.letter
    this.setState({
      board : boardCopy,
    })
  }

  updatePerviousPosition = (y,x) => {
    this.setState({
      prevPosition: [x,y]
    })
  }

  removeFromRack = (idx) => {
    console.log(idx)
    let playersRackCopy = this.state.playersRack.slice();
    playersRackCopy.splice(idx, 1, 0)
    this.setState({
      playersRack: playersRackCopy
    })
  }


  render() {
    const { tilePosition, letter } = this.props
    return (
      <table>
        <Board tilePosition={tilePosition} updateBoard={this.updateBoard} board={this.state.board} updatePerviousPosition={this.updatePerviousPosition} />
        <Rack removeFromRack={this.removeFromRack}tiles={this.state.tiles} playersRack={this.state.playersRack} updatePerviousPosition={this.updatePerviousPosition}/>
      </table>
    );
  }
}


export default DragDropContext(HTML5Backend)(App);
