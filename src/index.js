import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { observe } from './components/Game/Game';

const rootEl = document.getElementById('root');
observe((tilePosition, letter) =>
  ReactDOM.render(
    <App tilePosition={tilePosition} letter={letter}/>,
    rootEl 
  )
)

