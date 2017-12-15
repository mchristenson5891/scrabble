import React, { Component } from 'react'


export default class Square extends Component {
  render() {
    return (
      <span className='ScrabbleLetter'>
        {this.props.children}
      </span>
    ) 
  }
}

