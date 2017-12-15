import React, { Component } from 'react';
import './App.css';
import Board from './components/Board/Board';
import Rack from './components/Rack/Rack';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { TileScores, DoubleLetterTiles, TripleLetterTiles, DoubleWordTiles, TripleWordTiles } from './components/Constants/Constants';


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
      tempBoard : this.createBoard(),
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
      prevPosition : [],
      currentLetter : "",
      currentWord : [],
      playerOnesScore : 0,
      firstTurn: true,
      activeTiles: true
    };
  }

  genTiles() {
    return new Array(7).fill("")
  }

  componentDidMount() {
    let tilesCopy = [...this.state.tiles];
    let rack = [];
    this.state.playersRack.forEach( tileIdx => {
      let randomNum = Math.floor(Math.random() * tilesCopy.length);
      rack.push(tilesCopy[randomNum])
      tilesCopy.splice(randomNum, 1)
    })
    this.setState({
      tiles : tilesCopy,
      playersRack : rack,
      activeTiles: false
    })
  }

  getMoreTiles () {
    let tilesCopy = this.state.tiles.slice();
    let playersRackCopy = this.state.playersRack.slice();
    let newRack = [];
    playersRackCopy.forEach( tile => {
      if(tile === 0) {
        let randomNum = Math.floor(Math.random() * tilesCopy.length);
        newRack.push(tilesCopy[randomNum])
        tilesCopy.splice(randomNum, 1)
      }else {
        newRack.push(tile);
      }
    })
    this.setState({
      tiles : tilesCopy,
      playersRack : newRack
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
    let tempBoardCopy = this.state.tempBoard.slice();
    let currentWordCopy = this.state.currentWord.slice();
    if(tempBoardCopy[this.state.prevPosition[0]][this.state.prevPosition[1]] === this.state.currentLetter) {
      currentWordCopy = this.moveCurrentWordPosition(currentWordCopy);
      tempBoardCopy[this.state.prevPosition[0]][this.state.prevPosition[1]] = 0
    }
    if(tempBoardCopy[y][x] ===  0) {
      tempBoardCopy[y][x] = this.state.currentLetter
      currentWordCopy.push([y,x])
    }
    this.setState({
      tempBoard : tempBoardCopy,
      currentWord: currentWordCopy
    })
  }

  isSquareOccupied = (x,y) => {
    return (this.state.tempBoard[y][x] === 0 && this.state.board[y][x] === 0) ? true : false;
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

  moveCurrentWordPosition(currentWordCopy) {
    for(let i = 0; i < currentWordCopy.length ; i++) {
      let [thisY, thisX] = currentWordCopy[i];
      if(thisY === this.state.prevPosition[0] && thisX === this.state.prevPosition[1]) {
        currentWordCopy.splice(i, 1)
      }
    }
    return currentWordCopy
  }

  addToRack = () => {
    let tempBoardCopy = this.state.tempBoard.slice();
    let playersRackCopy = this.state.playersRack.slice();
    let index = playersRackCopy.indexOf(0);
    if(index === -1) {
      return
    } else {
      let currentWordCopy = this.state.currentWord.slice();
      playersRackCopy.splice(index, 1, this.state.currentLetter)
      currentWordCopy = this.moveCurrentWordPosition(currentWordCopy);
      tempBoardCopy[this.state.prevPosition[0]][this.state.prevPosition[1]] = 0;
      this.setState({
        playersRack : playersRackCopy,
        currentWord : currentWordCopy
      });
    } 
  }

  sortCurrentWord = () => {
    let currentWordCopy = this.state.currentWord.slice();
    for(let i = 0; i < currentWordCopy.length; i++) {
      for(let j = 1; j < currentWordCopy.length; j++) {
        if(currentWordCopy[i][0] === currentWordCopy[j][0]){
          currentWordCopy.sort(function(a, b) { 
            return a[1] > b[1] ? 1 : -1;
          });
        }else {
          currentWordCopy.sort(function(a, b) { 
            return a[0] > b[0] ? 1 : -1;
          });
        }
      }
    }
    return this.checkOtherTilesForWords(currentWordCopy)
  }

  checkOtherTilesForWords(currentWord) {
    let otherTiles =[];
    currentWord.forEach(pos => {
      let [x, y] = pos;
      if(this.state.board[x][y+1] !== 0 ) {
        for(let i = y+1; i < 14 ; i++) {
          if(this.state.board[x][i] !== 0) {
            otherTiles.push([x,i],[x,y])
          }
        }
      }else if(this.state.board[x+1] && (this.state.board[x+1][y] !== 0)) {
        for(let i=x+1; i< 14; i++) {
          if(this.state.board[i][y] !== 0) {
            otherTiles.push([i,y],[x,y])
          }
        }
      }else if(this.state.board[x-1] && (this.state.board[x-1][y] !== 0)) {
        for(let i=x-1; i > 0; i--) {
          if(this.state.board[i][y] !== 0) {
            otherTiles.push([i,y],[x,y])
          }
        }
      }else if(this.state.board[x][y-1] !== 0) {
        for(let i=y-1; i > 0; i--) {
          if(this.state.board[x][i] !== 0) {
            otherTiles.push([x,i],[x,y])
          }
        }
      }
    })

    if(otherTiles.length === 2 && otherTiles[0][0] === otherTiles[0][1]){
      otherTiles = otherTiles.map(JSON.stringify).reverse().filter(function (e, i, a) {
        return a.indexOf(e, i+1) === -1;
      }).reverse().map(JSON.parse)
    }

    return this.generateScore(currentWord, otherTiles)
  }

  makeWord(currentWord, otherTiles) {
    let newWord = [];
    currentWord.forEach(word => {
      let [thisY, thisX] = word;
      newWord.push(this.state.tempBoard[thisY][thisX])
    })   
    this.generateScore(newWord,currentWord)
  }

  generateScore (currentWord, otherTiles) {
    let sum = this.state.playerOnesScore;
    let newBoard = this.pushTempBoardToNewBoard();
    let currentSum = 0;
    let total = 0;
    currentWord.forEach(coor => {
      let [y,x] = coor;
      let letter = (this.state.board[y][x] !== 0) ? this.state.tempBoard[y][x] : null
      let bonus = DoubleLetterTiles[`x${x}y${y}`] ? DoubleLetterTiles[`x${x}y${y}`] : TripleLetterTiles[`x${x}y${y}`] ? TripleLetterTiles[`x${x}y${y}`] : 1;
      currentSum += TileScores[letter] * bonus;
    })
    currentWord.forEach(coor => {
      let [y,x] = coor;
      let bonus = DoubleWordTiles[`x${x}y${y}`] ? DoubleWordTiles[`x${x}y${y}`] : TripleWordTiles[`x${x}y${y}`] ? TripleWordTiles[`x${x}y${y}`] : 1;
      currentSum *= bonus;
    })
    otherTiles.forEach(coor => {
      let [y,x] = coor;
      let letter = (this.state.board[y][x] !== 0) ? this.state.tempBoard[y][x] : null
      sum += TileScores[letter]
    })
    total = sum + currentSum;
    this.getMoreTiles()
    this.setState({
      playerOnesScore: total,
      currentWord: [],
      firstTurn: false,
      board: newBoard
    })
  }

  pushTempBoardToNewBoard() {
    let boardCopy = this.state.board.slice();
    for(let i = 0; i < this.state.tempBoard.length; i++) {
      for(let j =0; j < this.state.tempBoard[i].length; j++ ){
        if(this.state.tempBoard[i][j] !== 0) {
          boardCopy[i][j] = this.state.tempBoard[i][j];
        }
      }
    }
    return boardCopy;
  }

  submitWord = () =>{
    // if(this.state.currentWord.length < 1) return
    this.sortCurrentWord()
    
  }


  render() {
    const { tilePosition } = this.props
    return (
      <main>
        <Board 
          updateCurrentLetter={this.updateCurrentLetter} 
          tilePosition={tilePosition} 
          updateBoard={this.updateBoard} 
          board={this.state.board} 
          updatePerviousPosition={this.updatePerviousPosition}
          isSquareOccupied={this.isSquareOccupied}
          firstTurn={this.state.firstTurn}
          tempBoard={this.state.tempBoard}
          currentLetter={this.state.currentLetter}
          playerOnesScore={this.state.playerOnesScore}
        />
        <h3 className='score'>Your Score: {this.state.playerOnesScore}</h3>
        <Rack 
          removeFromRack={this.removeFromRack} 
          addToRack={this.addToRack} 
          tiles={this.state.tiles} 
          playersRack={this.state.playersRack} 
          updatePerviousPosition={this.updatePerviousPosition} 
          updateCurrentLetter={this.updateCurrentLetter}
          submitWord={this.submitWord}
          tempBoard={this.state.tempBoard}
        />
      </main>
    );
  }
}


export default DragDropContext(HTML5Backend)(App);
