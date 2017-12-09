import React from 'react'

const Board = ({board}) => {
  return (
    <table>
      <tbody>
        {board.map((row, index) => {
          return (
            <tr>{
              row.map( square => {
                return (
                  <td>{square ? square : ""}</td>
                )
              })
            }</tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Board;