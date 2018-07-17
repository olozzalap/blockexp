import React, { Component } from 'react';
import Web3 from 'web3';
import _ from 'lodash';
import { Link } from 'react-router-dom'

import './style.css';

let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

class Home extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
            block_ids: [],
            block_hashes: [],
            current_accounts: [],
            current_block: null,
            coinbase: null
	    }
	}
    componentWillMount() {
        // Retrieves current latest block number, then runs getBlocks to get the latest Blocks counting down from state.current_block
        web3.eth.getBlockNumber().then( (blockNumberResp) => {
            this.setState({
                current_block: blockNumberResp
            });
            this.getBlocks(this.state.current_block, 20);
            // Retrieves current accounts
            web3.eth.getAccounts().then( (accountsResp) => {
                this.setState({
                    current_accounts: accountsResp
                });
                // Retrieves blockchain coinbase
                web3.eth.getCoinbase().then( (coinbase) => {
                    this.setState({
                        coinbase: coinbase
                    });
                });
            });
        });
    }

    getBlocks(current_block_num, max_blocks = 10) {
        console.log(current_block_num);
        const block_ids = this.state.block_ids.slice();
        const block_hashes = this.state.block_hashes.slice();

        if (current_block_num < max_blocks) max_blocks = current_block_num;
        for (var i = 0; i < max_blocks; i++, current_block_num--) {
            console.log(current_block_num);
            web3.eth.getBlock(current_block_num).then((currentBlockObj) => {
                console.log(currentBlockObj);
                block_ids.push(currentBlockObj.number);
                block_hashes.push(currentBlockObj.hash);
            });
        };
        this.setState({
            block_ids: block_ids,
            block_hashes: block_hashes
        });
        // console.log(this.state.block_ids.length);
        // console.log(this.state.block_hashes.length);
    }


    render() {
        var tableRows = [];
        console.log(this.state.block_ids.length);
        _.each(this.state.block_ids, (value, index) => {
            tableRows.push(
                <tr key={this.state.block_hashes[index]}>
                    <td className="tdCenter">{this.state.block_ids[index]}</td>
                    <td><Link to={`/block/${this.state.block_hashes[index]}`}>{this.state.block_hashes[index]}</Link></td>
                </tr>
            )
        });
        return (
            <div className="wonderous-content">
                <h2>Explore the Wonder:</h2>
                <p className="wonderous-lead-text">Latest Block: {this.state.current_block}</p>
                <table className="wonderous-block-table">
                    <thead><tr>
                        <th>Block #</th>
                        <th>Hash</th>
                    </tr></thead>
                    <tbody>
                        {tableRows}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Home;