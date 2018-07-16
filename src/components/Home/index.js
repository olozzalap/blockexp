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
        // Retrieves current accounts
        web3.eth.getAccounts().then( (accountsResp) => {
            this.setState({
                current_accounts: accountsResp
            });
        }).then( () => {
            console.log(this.state.current_accounts);
        });
        // Retrieves blockchain coinbase
        web3.eth.getCoinbase().then( (coinbase) => {
            this.setState({
                coinbase: coinbase
            });
        }).then( () => {
            console.log(this.state.coinbase);
            console.log(web3.eth);
        });
        // Retrieves current latest block number, then runs getBlocks to get the latest Blocks counting down from state.current_block
        web3.eth.getBlockNumber().then( (blockNumberResp) => {
            this.setState({
                current_block: blockNumberResp
            });
        }).then( () => {
            console.log(this.state.current_block);
            this.getBlocks(this.state.current_block, 20);
        });
    }

    getBlocks(current_block_num, max_blocks = 10) {
        const block_ids = this.state.block_ids.slice();
        const block_hashes = this.state.block_hashes.slice();

        if (current_block_num < max_blocks) max_blocks = current_block_num;
        for (var i = 0; i < max_blocks; i++, current_block_num--) {
            web3.eth.getBlock(current_block_num).then((currentBlockObj) => {
                console.log(currentBlockObj);
                block_ids.push(currentBlockObj.number);
                block_hashes.push(currentBlockObj.hash);
            });
        }
        this.setState({
            block_ids: block_ids,
            block_hashes: block_hashes
        })
        console.log(this.state.block_ids);
        console.log(this.state.block_hashes);
    }


    render() {
        return (
            <div className="wonderous-home">
                <h2>Home page</h2>
                <p>Current Block: {this.state.current_block}</p>
            </div>
        );
    }
}

export default Home;