import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Square extends Component {
  render() {
    return (
      <span className='ScrabbleLetter'>
        {this.props.children}
      </span>
      // <span className='ScrabbleNumber'>
      //   {TileScores[this.props.letter]}
      // </span>
    ) 
  }
}

