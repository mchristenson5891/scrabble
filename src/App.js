import React, { Component } from 'react';
import './App.css';
import Board from './components/Board/Board'
import Rack from './components/Rack/Rack'
import { observe } from './components/Game/Game'


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
      ' ']
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

  render() {
    return (
      <div>
          <Board tilePosition={[4,6]}/>
        <Rack tiles={this.state.tiles} playersRack={this.state.playersRack}/>
      </div>
    );
  }
}

export default App;
