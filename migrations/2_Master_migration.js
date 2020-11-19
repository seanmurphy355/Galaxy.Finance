const nUSDC = artifacts.require('USDC.sol');
const GalaxyToken = artifacts.require('GalaxyToken.sol');
const Staker = artifacts.require('StakerContract.sol');

//Deploy calls
module.exports = async function(deployer, network,  accounts) {
    //deploy nUSDC to the block chain
    await deployer.deploy(nUSDC)
    const _nUSDC = await nUSDC.deployed()

    //deploy the glxy token
    await deployer.deploy(GalaxyToken)
    const _Glxy = await GalaxyToken.deployed()

    //Deploy the Staker Contract
    await deployer.deploy (Staker, _Glxy.address, _nUSDC.address)
    const _Staker = await Staker.deployed()

    // Transfer the tokens for GLXY into the staker so they are actually farmable also give the second user in the array coins to actually use to farm with
    await _Glxy.transfer( _Staker.address,'20000000000000000000000')
    await _nUSDC.transfer(accounts[1], '100000000000000000000000')
}