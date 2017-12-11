import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Square extends Component {
  static propTypes = {
    black: PropTypes.bool
  }

  render() {
    const { black, handleSquareClick, x, y} = this.props
    const fill = black ? 'black' : 'white';

    return (
      <span style={{ backgroundColor: fill}}>
        {this.props.children}
      </span>
    ) 
  }
}