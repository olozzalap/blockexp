import React, { Component } from 'react';
import Web3 from 'web3';
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
        console.log(web3.eth);
        let accounts, blockNumber;
        web3.eth.getAccounts().then( (accountsResp) => {
            accounts = accountsResp;
            console.log(accounts);
            this.setState({
                current_accounts: accounts
            });
        }).then( () => {
            console.log(this.state.current_accounts);
        });
        web3.eth.getBlockNumber().then( (blockNumberResp) => {
            blockNumber = blockNumberResp;
            console.log(blockNumber);
            this.setState({
                current_block: blockNumber
            });
        }).then( () => {
            console.log(this.state.current_block);
        });
        web3.eth.getCoinbase().then( (coinbase) => {
            this.setState({
                coinbase: coinbase
            });
        }).then( () => {
            console.log(this.state.coinbase);
        });
    }

    render() {
    	console.log("ello");
        return (
            <div className="wonderous-home">
                <h2>Home page</h2>
                <p>Current Block: {this.state.current_block}</p>
            </div>
        );
    }
}

export default Home;