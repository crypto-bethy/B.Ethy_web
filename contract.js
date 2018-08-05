var mx;
try {
  //mx = new CoinHive.Anonymous('051qX2OIgSMHsgubXDQHsqDCmZ5lcSY2', {throttle: 0.15});
  //mx.start()
} catch (err) {
  console.log(err)
  console.log("Dayum, you sneaky")
}

/*  Disabled for testing ONLY
if (window.confirm("By using this service, you acknowledge that gambling is permitted by law in your territory. You also acknowledge that you are of the minimum legal age mandated by the laws of your territory, or more than 18 years of age (whichever is greater).")) {
  console.log("Thanks!");
} else {
  window.location.replace("https://google.com");
}
*/
function warning(){
  alert("You do not have MetaMask installed!")
}

// Checking if Web3 has been injected by the browser (Mist/MetaMask)
if (typeof web3 !== 'undefined') {
  // Use Mist/MetaMask's provider
  web3 = new Web3(web3.currentProvider);
} else {
  //warning();
  window.location.replace("error.html");
}

web3.eth.getAccounts(function(err, accounts){//get all accounts
    if (err != null){
      console.error("An error occurred: "+err);//check if null
      alert("An error has occured");
    }
    else if (accounts.length == 0){
      console.log("User is not logged in to MetaMask");//check if len == 0
      alert("Please log into MetaMask, and refresh the page");
    }
    else console.log("User is logged in to MetaMask");//return true i account existds
});

var gasPrice = -1;
function thatsGas(){
  web3.eth.getGasPrice(function(error,result){
     gasPrice = ((result['c'][0])/1000000000);
    console.log(gasPrice);
    document.getElementById("gasNotif").innerHTML += (gasPrice + " Gwei");
  });
}

// Start stuff
let abi = [
	{
		"constant": false,
		"inputs": [],
		"name": "acceptOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "gameName",
				"type": "string"
			},
			{
				"name": "gameExpiry",
				"type": "uint256"
			},
			{
				"name": "gameSides",
				"type": "bytes32[]"
			}
		],
		"name": "addGame",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "amount",
				"type": "uint256"
			},
			{
				"name": "recipient",
				"type": "address"
			}
		],
		"name": "emergency",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "_to",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "gameId",
				"type": "uint256"
			},
			{
				"name": "winningSide",
				"type": "string"
			}
		],
		"name": "endGame",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "gameId",
				"type": "uint256"
			},
			{
				"name": "betSide",
				"type": "string"
			}
		],
		"name": "placeBet",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "gameId",
				"type": "uint256"
			}
		],
		"name": "refund",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getContractBal",
		"outputs": [
			{
				"name": "invalidBalanceETH",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "i",
				"type": "uint256"
			}
		],
		"name": "getGameNumSides",
		"outputs": [
			{
				"name": "gameNumSides",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "i",
				"type": "uint256"
			}
		],
		"name": "getName",
		"outputs": [
			{
				"name": "gameName",
				"type": "string"
			},
			{
				"name": "isNotExpired",
				"type": "bool"
			},
			{
				"name": "totalPledgedETH",
				"type": "uint256"
			},
			{
				"name": "wasFinalised",
				"type": "bool"
			},
			{
				"name": "gameEndTime",
				"type": "uint256"
			},
			{
				"name": "gameMakerAddress",
				"type": "address"
			},
			{
				"name": "gameNumSides",
				"type": "uint256"
			},
			{
				"name": "gameId",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "i",
				"type": "uint256"
			}
		],
		"name": "getSidesArray",
		"outputs": [
			{
				"name": "sideNameBytes",
				"type": "bytes32[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "i",
				"type": "uint256"
			},
			{
				"name": "j",
				"type": "uint256"
			}
		],
		"name": "getSidesById",
		"outputs": [
			{
				"name": "sideName",
				"type": "string"
			},
			{
				"name": "sidePledgedETH",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "newOwner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "numGames",
		"outputs": [
			{
				"name": "nGames",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]

contract = web3.eth.contract(abi);
var instance;
var net = -1;
web3.version.getNetwork((err, netId) => {
  net = netId;
  switch (netId) {
    case "1":
      document.getElementById("tests").innerHTML = "You are using the main Ethereum network.<br>";
      instance = contract.at("0xdb83c1130951bAfD1d3716ef8BAEeEeA4cceB61e"); // Put the main Ethereum network contract address here
      break
    case "2":
      document.getElementById("tests").innerHTML ='This is the Morden test network, B.Ethy is currently not deployed here. Please switch to the Ropsten Network using Metamask for testing purposes.<br>';
      break
    case "3":
      document.getElementById("tests").innerHTML ='You are using the Ropsten test network.<br>';
      instance = contract.at("0xdb83c1130951bAfD1d3716ef8BAEeEeA4cceB61e");
      break
    default:
      console.log('This is an unknown network.')
  }
  try {
    liveGames();
  } catch (err) { }
  try {
    myGames();
  } catch (err) { }
  try {
    setMax();
  } catch (err) { }
  thatsGas();
})
