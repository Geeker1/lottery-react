import Web3 from 'web3'

if (window.ethereum){
	const web3 = new Web3(ethereum);
	ethereum.enable()
		.then(console.log)
		.catch(err=> {throw new Error})
}


export default web3;