import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Board from './components/Board/Board'
import { observe } from './components/Game/Game';

const rootEl = document.getElementById('root');
observe(tilePosition => 
  ReactDOM.render(
    <Board tilePosition={tilePosition} />,
    rootEl 
  )
)

