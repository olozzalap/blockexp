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
          <img className="wonderous-logo" src="https://flowingdata.com/wp-content/uploads/2011/07/Twitter-and-Flickr-world-map-954x558.jpg" alt="logo" />
          <h1>Block Explorer</h1>
        </div>
        <Router>
          <div>
            <div className="wonderous-nav">
              <div className="wonderous-nav-inner">
                <Link className="wonderous-link" to="/">Home</Link>
              </div>
            </div>  
            <Route exact path="/" component={Home}/>
            <Route exact path="/block" component={Home}/>
            <Route path="/block/:blockHash" component={Block}/>
          </div>
        </Router>
        
      </div>
    );
  }
}
export default App;