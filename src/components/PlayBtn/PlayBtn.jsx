import React from 'react';
import './PlayBtn.css'
const PlayBtn = ({ submitWord }) => {
  return (
    <td onClick={() => submitWord() } className='playBtn' ></td>
  )
}
  

export default PlayBtn;
