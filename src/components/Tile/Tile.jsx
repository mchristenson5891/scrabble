import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ItemTypes } from './../Constants/Constants';
import { DragSource } from 'react-dnd';
import './Tile.css'
import { canMoveTile, moveTile, updateLetter } from './../Game/Game'


// This is because there is nothing to describe: there is literally a single draggable object in the whole application! If we had a bunch of chess pieces, it might be a good idea to use the props parameter and return something like { pieceId: props.id }. In our case, an empty object will suffice.
const tileSource = {
  beginDrag(props) {
    updateLetter(props.letter)
    return {letter : props.letter};
  },
  // endDrag(props, monitor) {
  //   const item = monitor.getItem();
  //   const dropResult = monitor.getDropResult()
  //   moveTile(0,0, item.letter)
  //   console.log("item", item);
  //   console.log("drop", dropResult)
  // }
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
  
  constructor() {
    super()
    this.state = {
      tilePosition : []
    }
  }

  componentDidMount() {
    this.setState({
      tilePosition: this.props.tilePosition
    })
  }



  render() {
    const { connectDragSource, isDragging } = this.props;
    const [x, y] = this.state.tilePosition;
    const rankIdx = this.props.arrIndx
    console.log(this.props)
    return connectDragSource(
      <div draggable='true' onMouseDown={() => this.props.updatePerviousPosition(x,y) }style={{
        opacity: isDragging ? 0.5 : 1,
        fontWeight: 'bold',
      }} className='tile'>{(this.props.letter === 0) ? "" : this.props.letter} 
      </div>
    )
  }
}

export default DragSource(ItemTypes.TILE, tileSource, collect)(Tile);