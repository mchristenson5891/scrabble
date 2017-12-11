import React from 'react'


const Rack = ({tiles, playersRack}) => {
  return (
    <table className='players-tiles'>
      <tbody>
        <tr>
          {playersRack.map(tile => <td>{tile}</td>)}
        </tr>
      </tbody>
    </table>
  )
}

export default Rack