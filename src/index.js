import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { observe } from './components/Game/Game';

ReactDOM.render(<App />, document.getElementById('root'));

// const rootEl = document.getElementById('root');
// observe((tilePosition, letter) =>
  // ReactDOM.render(
  //   <App />, rootEl
    // <App tilePosition={tilePosition} letter={letter}/>,
    // rootEl 
  // )
// )

