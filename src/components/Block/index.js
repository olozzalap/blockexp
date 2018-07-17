import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Web3 from 'web3';

import './style.css';

let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

class Block extends Component {
  render() {
    return (
      <div className="wonderous-single-block wonderous-content">
        <h2>Block Info</h2>
      </div>
    );
  }
}
export default Block;