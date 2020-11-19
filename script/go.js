//Master Deployer
//Consolidated all other deployer contracts into a master deployer file
//https://www.trufflesuite.com/docs/truffle/getting-started/running-migrations ref
const StakerContract = artifacts.require('StakerContract')

//I get these files with the gensis of a truffle project but they have been changed to depoly the staker contract
module.exports = async function (callback) {
    let _Staker = await StakerContract.deployed()
    //call dist and give stakers some tokens =D
    await _Staker.distributeTokens()

    console.log("tokens are issued")
    callback()
};
//truffle exec script/issueTokens.js   command for token distribution.