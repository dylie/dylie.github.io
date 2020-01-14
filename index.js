const Web3 = require('web3');
const ethers = require('ethers');
var provider;
if (typeof provider !== 'undefined') {
  provider = new Web3(Web3.currentProvider);
} else {
  console.log('No web3? You should consider trying MetaMask!');
  provider = new Web3('https://rpc.ether1.org');
}

abi = JSON.parse('[{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"votesTracking","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]')

//address = "0xfdd0fd5121c09ccd82332e93e6acc77524591582";
address = "0x65203c962604446378402ebd1912091cc7c79276";
contract = new provider.eth.Contract(abi, address);
candidates = {"Dylie": "candidate-1", "James": "candidate-2", "Primate": "candidate-3", "Fallen": "candidate-4", "Exlo": "candidate-5", "Test": "candidate-6"}

window.voteForCandidate = function(candidate){
 candidateName = $("#candidate").val();
  console.log(candidateName);


  contract.methods.voteForCandidate(ethers.utils.formatBytes32String(candidateName)).call().then((f) => {
    let div_id = candidates[candidateName];
    contract.methods.totalVotesFor(ethers.utils.formatBytes32String(candidateName)).call().then((f) => {
      $("#" + div_id).html(f);
    })
  });
}

$(document).ready(function() {
  
 candidateNames = Object.keys(candidates);

 for(var i=0; i<candidateNames.length; i++) {
  let name = candidateNames[i];
  contract.methods.totalVotesFor(ethers.utils.formatBytes32String(name)).call().then((f) => {
    $("#" + candidates[name]).html(f);
  })
 }
});
