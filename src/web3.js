import Web3 from 'web3'

let web3;
let ethereum = window.ethereum;

if (ethereum){
	ethereum.autoRefreshOnNetworkChange = false;
	web3 = new Web3(ethereum);
	ethereum.enable()
	  .then()
	  .catch(err=> {throw new Error()})
	}
else{
	throw new Error(
	'Ethereum could not be found on Metamask.... Is it installed ?')
}

export default web3;