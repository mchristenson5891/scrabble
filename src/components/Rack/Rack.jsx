import React, { Component } from 'react';
import Tile from './../Tile/Tile';
import PlayBtn from './../PlayBtn/PlayBtn'
import { ItemTypes } from './../Constants/Constants';
import { DropTarget } from 'react-dnd';

const squareTarget = {
  drop(props, monitor, component) {
    props.addToRack();
    console.log(props, component)
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

class Rack extends Component {

  render() {
    const { playersRack, updatePerviousPosition, removeFromRack, connectDropTarget, updateCurrentLetter, submitWord } = this.props;

    return connectDropTarget(
      <table className='players-tiles'>
        <tbody>
        <tr>
          <td>Forfeit</td>
          <td>Exchange</td>
          {playersRack.map((tile, idx) => 
            <td className={(tile === 0 ? 'white' : 'tile')}>
              <Tile 
                updateCurrentLetter={updateCurrentLetter} isActive={true}
                tilePosition={[0,0]}
                letter={tile} 
                updatePerviousPosition={updatePerviousPosition} removeFromRack={removeFromRack} 
                arrIndx={idx}
              />
            </td>)}
          <td>Shuffle</td>
          <PlayBtn submitWord={submitWord} />
        </tr>
      </tbody>
    </table>
    )
  }
}

export default DropTarget(ItemTypes.TILE, squareTarget, collect)(Rack);