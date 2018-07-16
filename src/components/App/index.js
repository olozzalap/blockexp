import React, { Component } from 'react';
import './style.css';
import Block from './../Block';
import Home from './../Home';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="wonderous-wrap">
        <div className="wonderous-header">
          <img src="https://flowingdata.com/wp-content/uploads/2011/07/Twitter-and-Flickr-world-map-954x558.jpg" className="wonderous-logo" alt="logo" />
          <h1>Block Explorer</h1>
        </div>
        <div className="wonderous-nav">
          <Router>
            <div>
              <Link className="wonderous-link" to="/">Home</Link>
              <Link className="wonderous-link" to="/block">Block</Link>
              <Route exact path="/" component={Home}/>
              <Route exact path="/block" render={() => (
                <h3>Please select a blockHash.</h3>
              )}/>
              <Route path="/block/:blockHash" component={Block}/>
            </div>
          </Router>
        </div>
      </div>
    );
  }
}
export default App;