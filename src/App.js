import React from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from "./web3";


function App() {
  console.log(web3.version, web3.currentProvider);
  // web3.ethereum.enable()
  //   .then(result=>console.log(result))
  //   .catch(error=>console.log("Error connecting to metamask"))
  web3.eth.getAccounts().then(console.log)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;