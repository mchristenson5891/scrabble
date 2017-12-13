import React from 'react';


const PlayBtn = ({submitWord}) => {
  return (
    <td onClick={() => submitWord() }>Play</td>
  )
}
  

export default PlayBtn;
