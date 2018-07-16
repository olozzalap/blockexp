import React, { Component } from 'react';
import Web3 from 'web3';
import './style.css';

var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

class Home extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
	      block_ids: [],
	      block_hashes: [],
	      curr_block: null
	    }
	  }

    render() {
    	console.log(web3.eth);
    	console.log("ello");
    	console.log(web3.eth.getCoinbase());
        return (
            <div className="wonderous-home">
                <h2>Home page</h2>
            </div>
        );
    }
}

export default Home;