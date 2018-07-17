import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Web3 from 'web3';

import './style.css';

let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

class Block extends Component {
  constructor(props) {
    super(props);
    this.state = {
      block: null,
      block_id: null,
      block_hash: null,
      block_date: null,
      block_txs: null,
      block_difficulty: null,
      block_difficulty_total: null
    }
  }
  componentWillMount() {
    // Get the block hash from URL arguments (defined by Route pattern)
    let block_hash = this.props.match.params.blockHash;
    this.getBlockState(block_hash, () => {
      this.render();
    });
  }
  componentWillReceiveProps(nextProps) {
    var block_hash_old = this.props.match.params.blockHash;
    var block_hash_new = nextProps.match.params.blockHash;
    // compare old and new URL parameter (block hash)
    // if different, reload state using web3
    if (block_hash_old !== block_hash_new)
    this.getBlockState(block_hash_new);
  }

  getBlockState(block_hash) {
    console.log("Block hash: " + block_hash);

    web3.eth.getBlock(block_hash).then((currBlockObj) => {
      console.log(currBlockObj);
      this.setState({
        block: currBlockObj,
        block_id: currBlockObj.number,
        block_hash: currBlockObj.hash,
        block_date: Date(parseInt(currBlockObj.timestamp, 10)).toString(),
        block_txs: parseInt(currBlockObj.transactions.slice().length, 10),
        block_difficulty: parseInt(currBlockObj.difficulty, 10),
        block_difficulty_total: parseInt(currBlockObj.totalDifficulty, 10)
      })
    });
  }


  render() {
    return (
      <div className="wonderous-single-block wonderous-content">
        <h2>Block #{this.state.block ? this.state.block.number : ''}</h2>
        <p className="wonderous-lead-text">
          Hash: {this.state.block ? this.state.block.hash : ''}
        </p>

        <div>
          <table className="wonderous-block-table">
            <tbody>
                <tr><td className="tdLabel">Height: </td><td>{this.state.block ? this.state.block.number : ''}</td></tr>
                <tr><td className="tdLabel">Transactions: </td><td>{this.state.block_txs ? this.state.block_txs : ''}</td></tr>
                <tr><td className="tdLabel">Hash: </td><td>{this.state.block ? this.state.block.hash : ''}</td></tr>
                <tr><td className="tdLabel">Parent hash: </td>
                  <td><Link to={`../block/${this.state.block ? this.state.block.parentHash : ''}`}>{this.state.block ? this.state.block.parentHash : ''}</Link></td></tr>
                <tr><td className="tdLabel">Nonce: </td><td>{this.state.block ? this.state.block.nonce : ''}</td></tr>
                <tr><td className="tdLabel">Size: </td><td>{this.state.block ? this.state.block.size : ''} bytes</td></tr>
                <tr><td className="tdLabel">Difficulty: </td><td>{this.state.block_difficulty ? this.state.block_difficulty : ''}</td></tr>
                <tr><td className="tdLabel">Difficulty: </td><td>{this.state.block_difficulty_total ? this.state.block_difficulty_total : ''}</td></tr>
                <tr><td className="tdLabel">Gas Limit: </td><td>{this.state.block ? this.state.block.gasLimit : ''}</td></tr>
                <tr><td className="tdLabel">Gas Used: </td><td>{this.state.block ? this.state.block.gasUsed : ''}</td></tr>
                <tr><td className="tdLabel">Sha3Uncles: </td><td>{this.state.block ? this.state.block.sha3Uncles : ''}</td></tr>
                <tr><td className="tdLabel">Extra data: </td><td>{this.state.block ? this.state.block.extraData : ''}</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default Block;