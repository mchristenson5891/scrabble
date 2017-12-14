import React, { Component } from 'react';
import Tile from './../Tile/Tile';
import PlayBtn from './../PlayBtn/PlayBtn'
import { ItemTypes } from './../Constants/Constants';
import { DropTarget } from 'react-dnd';

const squareTarget = {
  drop(props, monitor, component) {
    props.addToRack();
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
    const { playersRack, updatePerviousPosition, removeFromRack, connectDropTarget, updateCurrentLetter, submitWord, tempBoard } = this.props;
    console.log(tempBoard)

    return connectDropTarget(
      <table className='players-tiles'>
        <tbody>
        <tr>
          <td>Exchange</td>
          {playersRack.map((tile, idx) => 
            <td key={idx} className={(tile === 0 ? 'white' : null)} id={(tile === 0 ? null : 'ScrabbleBlock')} >
              <Tile 
                updateCurrentLetter={updateCurrentLetter} isActive={true}
                tilePosition={[0,0]}
                letter={tile} 
                updatePerviousPosition={updatePerviousPosition} removeFromRack={removeFromRack} 
                arrIndx={idx}
              />
            </td>)}
          <PlayBtn tempBoard={tempBoard} submitWord={submitWord} />
        </tr>
      </tbody>
    </table>
    )
  }
}

export default DropTarget(ItemTypes.TILE, squareTarget, collect)(Rack);