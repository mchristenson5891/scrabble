import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ItemTypes, TileScores } from './../Constants/Constants';
import { DragSource } from 'react-dnd';
import './Tile.css';



const tileSource = {
  beginDrag(props) {
    props.updateCurrentLetter(props.letter)
    return {letter : props.letter};
  },
  endDrag(props, monitor) {
    if(monitor.didDrop() && props.removeFromRack) {
      return props.removeFromRack(props.arrIndx) 
    } else {
      return 
    }
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}

class Tile extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
  };
  
  constructor() {
    super()
    this.state = {
      tilePosition : [],
      isActive: false
    }
  }

  componentDidMount() {
    this.setState({
      tilePosition: this.props.tilePosition,
      isActive: this.props.isActive
    })
  }

  render() {
    const { connectDragSource, isDragging } = this.props;
    const [x, y] = this.state.tilePosition;
    return connectDragSource(
      <div  draggable='true' 
            onMouseDown={() => this.props.updatePerviousPosition(x,y) } 
            style={{
              opacity: isDragging ? 0.5 : 1,
              fontWeight: 'bold',
            }} 
      >
        <span className='ScrabbleLetter'>{(this.props.letter === 0) ? "" : this.props.letter.toUpperCase()}</span>
        <span className='ScrabbleNumber'>{TileScores[this.props.letter]}</span>
      </div>
    )
  }
}

export default DragSource(ItemTypes.TILE, tileSource, collect)(Tile);