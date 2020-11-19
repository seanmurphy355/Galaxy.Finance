# Purpose: 
We can create a non-traditional asset that is immutable meaning in theory it cannot be manipluated unless there is corrupt code.
Staking applictions: requires validators to distribute the goverance token. DEFI = Decentralized finance (this is somewhat new idea)

## Required:
1. Solidity
2. Ganache: https://www.trufflesuite.com/ganache
3. Node.js V 12.19 works best with ganache if V is below 13  command:
4. React.js
5. Truffle frame work. command: npm install -g truffle(should work if not I am using version 5.1.39 command: npm install --g truffle@5.1.39) https://www.trufflesuite.com/docs/truffle/getting-started/installation
6. Make sure to install bootstrap and Material UI.
7. MetaMask: https://metamask.io/download.html


## Commands list: 
- https://nodejs.org/en/ install node version below 13 I am using 12.19
- `npm install -g truffle`
- `npm install @material-ui/core`
- `npm install @material-ui/icons`
- `npm install bootstrap@3`



## Truffle commands:
- `truffle compile`
- `truffle deploy`
- `truffle migrate`
- `truffle migrate --rest`
- `truffle test`

## Start application:
- `npm start`


## Rewards script: (use a new powershell after starting application)
- `truffle exec script/go.js`


note you must rename the contracts file in the build/contracts to abi and move it to the Components file located in the src file when updating any contract data.
The reason for this is that our files need this jason data... if the contracts were actually deployed this would not be the case but since I will not be deploying them you must take this step to see updates

## Processes of reward distribution:
1.Migrate conntracts to blockchain
2.Rename contracts in build/contracts to abi and move the abi file to src/components. (you should now have 100000 nusdc in the wallet when you refresh the page) (make sure to refresh the page after each step)
3.Stake user funds or unstake user funds and move the abi file back to builds and rename the file to contracts (careful because the normal contracts file holds all sol files do not save over this).
4.Run the rewards script with the new build/contracts file updated
5.Change the build/contracts file back to abi and move it to src/components.
if you have staked funds rewards should be distrubited if you do not there should be no change. Again this all could be automated if the contracts were deployed to the mainnet.

Any questions please watch the video for this part.(Can be found on the hosted website demo video page).

## Other usage notes:
1. When using the index 0 and 1 accounts that ganache provides remember everytime you open ganache up these accounts change you must create new metamask accounts and update the abi file
