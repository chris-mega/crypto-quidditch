import Web3 from 'web3';
export async function loadWeb3() {
  let web3;
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
  } else if (window.web3) {
    web3 = new Web3(window.web3.currentProvider);
  } else {
    throw new Error('No-Ethereum browser detected. Install Metamask');
  }
  return web3;
}
