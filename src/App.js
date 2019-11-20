import React, { useEffect, useState } from 'react';
import './App.css';
import web3 from "./web3";
import lottery from "./lottery";


const App =()=> {

  const [state, setState] = useState({
    manager:"",
    players:[],
    balance:"",
    value: "",
    message:'',
    account:''
  })

  const fetchManager = async ()=>{
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    const account = await web3.eth.getAccounts();
    setState({
      ...state,
      manager,
      players,
      balance,
      account:account[0]
    })
  }

  const onSubmit = async (e)=>{
    e.preventDefault();

    const accounts = await web3.eth.getAccounts();
    setState({...state, message:'Waiting on transaction success'});

    try{
      await lottery.methods.entry().send({
        from: accounts[0],
        value: web3.utils.toWei(value, 'ether')
      });
    }catch(err){
      setState({...state, message: 'An error occured during transaction.'})
      return
    }

    setState({...state, message:'You have been entered into the contract!'});
  }

  const onClick = async (e)=>{
    const accounts = await web3.eth.getAccounts();

    setState({...state, message:'Waiting on transaction success...'});

    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });

    setState({...state, message:"Winner has been picked"});
  }

  useEffect(
    ()=>{
      fetchManager()
        .then();
    }, []
  )

  const renderPickButton = (account, manager) =>{
    if (account === manager){
      return(
        <>
          <hr />
          <h1>Ready to pick a Winner ?</h1>
          <button onClick={onClick}>Pick Winner!</button>
        </>
      )
    }
  }

  const { manager, players, balance, value, message, account } = state

  return (
    <div className='app'>
      <h2>Lottery Contract </h2>
      <p>This contract is managed by <strong>{manager}</strong> </p>
      <p>There are currently {players.length} people entered, competing to win
      <strong> {web3.utils.fromWei(balance, 'ether')} ether!</strong></p>

      <hr />

      <form onSubmit={onSubmit}>
        <h3> Want to try your luck </h3>
        <div>
          <label> Amount of Ether to enter </label>
          <input
            value={value}
            onChange={event=> setState({
              ...state,
              value: event.target.value
            })}
          />
        </div>

        <button> Enter </button>
      </form>
      {renderPickButton(account, manager)}
      </div>
  );
}

export default App;
