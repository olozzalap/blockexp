import React from 'react';
import ReactDOM from 'react-dom';
import Web3 from 'web3';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
