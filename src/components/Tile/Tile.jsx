import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ItemTypes } from './../Constants/Constants';
import { DragSource } from 'react-dnd';
import './Tile.css'


// This is because there is nothing to describe: there is literally a single draggable object in the whole application! If we had a bunch of chess pieces, it might be a good idea to use the props parameter and return something like { pieceId: props.id }. In our case, an empty object will suffice.
const tileSource = {
  beginDrag(props) {
    return {};
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class Tile extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
  };

  render() {
    const { connectDragSource, isDragging } = this.props;
    return connectDragSource(
      <div style={{
        opacity: isDragging ? 0.5 : 1,
        fontWeight: 'bold',
      }} className='tile' >E
      </div>
    )
  }
}

export default DragSource(ItemTypes.TILE, tileSource, collect)(Tile);