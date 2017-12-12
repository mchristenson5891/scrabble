import React, { Component } from 'react';
import Tile from './../Tile/Tile';
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
    const { tiles, playersRack, updatePerviousPosition, removeFromRack, connectDropTarget, updateCurrentLetter } = this.props;


    return connectDropTarget(
      <table className='players-tiles'>
        <tbody>
          <tr>
          {playersRack.map((tile, idx) => <td className={(tile === 0 ? 'white' : 'tile')} ><Tile updateCurrentLetter={updateCurrentLetter} isActive={true}tilePosition={[0,0]}letter={tile} updatePerviousPosition={ updatePerviousPosition } removeFromRack={removeFromRack} arrIndx={idx}/></td>)}
        </tr>
      </tbody>
    </table>
    )
  }
}



// const Rack = ({ tiles, playersRack, updatePerviousPosition, removeFromRack, connectDropTarget }) => {
//   return connectDropTarget (
//     <table className='players-tiles'>
//       <tbody>
//         <tr>
//           {playersRack.map((tile, idx) => <td className={(tile === 0 ? 'white' : 'tile')} ><Tile tilePosition={[0,0]}letter={tile} updatePerviousPosition={ updatePerviousPosition } removeFromRack={removeFromRack} arrIndx={idx}/></td>)}
//         </tr>
//       </tbody>
//     </table>
//   )
// }


export default DropTarget(ItemTypes.TILE, squareTarget, collect)(Rack);