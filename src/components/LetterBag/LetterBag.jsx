import React, { Component } from 'react';

class LetterBag extends Component {
  constructor() {
    super();
    this.state = {
      tiles: [
        {letter: "A", score: 1, amount: 9},
      ]
    }
  }

  add(tile) {
    this.state.push(tile);
  }

}

export default LetterBag