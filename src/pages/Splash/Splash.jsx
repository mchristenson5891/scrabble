import React from 'react'
import {Link} from 'react-router-dom';

const Splash = ({pickNumberOfPlayers}) => {
  console.log(pickNumberOfPlayers)
  return (
    <div>
      <h1>Scrabble</h1>
      <h2>How many player?</h2>
      <Link to='/hello'><button onClick={()=> pickNumberOfPlayers(2)}>2</button></Link>
      <Link to='/hello'><button onClick={()=> pickNumberOfPlayers(4)}>4</button></ Link>
      <Link to='/hello'><button onClick={()=> pickNumberOfPlayers(3)}>3</button></ Link>
    </div>
  )
}
  

export default Splash

// import React from 'react';
// import './PlayBtn.css'
// const PlayBtn = ({ submitWord }) => {
//   return (
//     <td onClick={() => submitWord() } className='playBtn' ></td>
//   )
// }
  

// export default PlayBtn;