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
      prevPosition : [0,0],
      currentLetter : ""
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

  updateCurrentLetter = (letter) => {
    this.setState({
      currentLetter : letter
    })
  }

  updateBoard = (y, x) => {
    let boardCopy = this.state.board.slice();
    if(boardCopy[this.state.prevPosition[0]][this.state.prevPosition[1]] === this.state.currentLetter) {
      boardCopy[this.state.prevPosition[0]][this.state.prevPosition[1]] = 0
    }
    if(boardCopy[y][x] ===  0) boardCopy[y][x] = this.state.currentLetter 
    this.setState({
      board : boardCopy,
    })
  }

  isSquareOccupied = (x,y) => {
    return (this.state.board[y][x] === 0) ? true : false;
  }

  updatePerviousPosition = (y,x) => { 
    this.setState({
      prevPosition: [x,y]
    })
  }

  removeFromRack = (idx) => {
    let playersRackCopy = this.state.playersRack.slice();
    playersRackCopy.splice(idx, 1, 0)
    this.setState({
      playersRack: playersRackCopy
    })
  }

  addToRack = () => {
    let boardCopy = this.state.board.slice();
    let playersRackCopy = this.state.playersRack.slice();
    let index = playersRackCopy.indexOf(0);
    playersRackCopy.splice(index, 1, this.state.currentLetter)
    boardCopy[this.state.prevPosition[0]][this.state.prevPosition[1]] = ""
    this.setState({
      playersRack: playersRackCopy
    });
  }


  render() {
    const { tilePosition, letter } = this.props
    return (
      <table>
        <Board 
          updateCurrentLetter={this.updateCurrentLetter} 
          tilePosition={tilePosition} 
          updateBoard={this.updateBoard} board={this.state.board} updatePerviousPosition={this.updatePerviousPosition}
          isSquareOccupied={this.isSquareOccupied}
        />
        <Rack removeFromRack={this.removeFromRack} addToRack={this.addToRack} tiles={this.state.tiles} playersRack={this.state.playersRack} updatePerviousPosition={this.updatePerviousPosition} updateCurrentLetter={this.updateCurrentLetter}/>
      </table>
    );
  }
}


export default DragDropContext(HTML5Backend)(App);
