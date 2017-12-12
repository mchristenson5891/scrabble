import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Square from './../Square/Square';
import { ItemTypes } from './../Constants/Constants';
import { DropTarget } from 'react-dnd';
import { canMoveTile, moveTile } from './../Game/Game'

let letter;

const squareTarget = {
  canDrop(props) {
    return canMoveTile(props.x, props.y)
  },

  drop(props, monitor, component) {
    moveTile(props.x, props.y, props.letter)
    props.updateBoard(props.y, props.x);
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

class BoardSquare extends Component {
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired
  };


  render() {
    const { x, y, connectDropTarget, isOver, canDrop } = this.props;
    // const black = (x + y) % 2 === 1;
    return connectDropTarget(
      <td style={{
        position: 'relative',
      }}>
        <Square x={x} y={y}>
          {this.props.children}
          {isOver && canDrop && <span style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: 'yellow',
          }}></span>}
        </Square>
      </td>
    )
  }
}

export default DropTarget(ItemTypes.TILE, squareTarget, collect)(BoardSquare);