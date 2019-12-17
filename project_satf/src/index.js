import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import gsap from "gsap";

ReactDOM.render(<App />, document.getElementById('root'));
gsap.to(".App-text", {rotation: 10, x: 10, duration: 1});
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
