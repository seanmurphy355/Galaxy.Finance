const { use } = require('chai');

const nUSDC= artifacts.require('USDC.sol');
const GalaxyToken = artifacts.require('GalaxyToken.sol');
const StakerContract = artifacts.require('StakerContract.sol');

require('chai')
    .use(require('chai-as-promised'))
    .should()


//Tests
contract('StakerContract',([Owner, User]) => {
    let _Staker, _Glxy, _nUSDC


    //Dependencies essentially 
    before(async () => {
        //load our contracts 
        _Glxy = await GalaxyToken.new()
        _nUSDC = await nUSDC.new()
        _Staker = await StakerContract.new(_Glxy.address, _nUSDC.address)

        //transfer all the token to the token farm and send our tokens to the OG investor.
        await _Glxy.transfer(_Staker.address,'20000000000000000000000')
        await _nUSDC.transfer(User,'100000000000000000000000',{ from: Owner})
    })

    //Test nUSDC contract out
    describe('check if nUSDC was deployed properly', async () => {
        it('Contains the name', async () => {
            const token_name = await _nUSDC.name()
            assert.equal(token_name, 'nUSDC')
        })
    })    

    
    //Test GLXY contract out
    describe('check if Glxy was deployed properly', async () => {
        it('Contains the name', async () => {
            const token_name = await _Glxy.name()
            assert.equal(token_name, 'Galaxy.Finance')
        })
    })  


      //Test that Staker was deployed
      describe('check if Staker Contract was deployed properly', async () => {
        it('Contains the name', async () => {
            const token_name = await _Staker.name()
            assert.equal(token_name, 'Glxy Staking Farm')
        })
        //Check thee number of tokens the contract recieved
        it('Contains Token Number', async () => {
            let contract_Balance = await _Glxy.Balance(_Staker.address)
            assert.equal(contract_Balance, '20000000000000000000000')
        })
    })

       //test user interactions with staker
       describe('Describe staking interactions correctly', async () => {
        it('Check user rewards', async () => {
            let Final

            Final= await _nUSDC.Balance(User)
            // Check user balance
            assert.equal(Final.toString(), '100000000000000000000000'),'user has a proper balance'

            //approve interaction with staker contract and let user insert requested balance 
            await _nUSDC.approve(_Staker.address,'100000000000000000000000',{from: User})
            await _Staker.FarmTokens('100000000000000000000000',{from: User})

            //Check user balance after staking should be 0
            Final = await _nUSDC.Balance(User)
            assert.equal(Final.toString(), '0'),'user has a proper balance'
            
            //check to see if token blanace is still proper aafter staking
            Final = await _nUSDC.Balance(_Staker.address)
            assert.equal(Final.toString(), '100000000000000000000000')

            //Check to see if investor is staking
            Final = await _Staker.currentlyStaked(User)
            assert.equal(Final.toString(), 'true'),'the user is staking'

            //Check to see if investor staking balance is correct
            Final = await _Staker.stakerBalance(User)
            assert.equal(Final.toString(), '100000000000000000000000')

                
            //ensure that the master address can issue tokens
            await _Staker.distributeTokens({from: Owner})

            //user should get payed out %10 of balance in GLXY for staking 
            Final = await _Glxy.Balance(User)
            assert.equal(Final.toString(), '10000000000000000000000')

            //Make sure owner is only person that can issue tokens to user. test user calling rewards
            await _Staker.distributeTokens({from: User}).should.be.rejected;

            // Final test set it to unstake staked tokens 
            await _Staker.UnstakeTokens({from: User})

            //check users balance of nUSDC should be 100,000
            Final = await _nUSDC.Balance(User)
            assert.equal(Final.toString(), '100000000000000000000000')

            //check users balance of nUSDC in staker contract should be 0
            Final = await _nUSDC.Balance(_Staker.address)
            assert.equal(Final.toString(), '0')

            //check users staker balance of nUSDC in staker contract should be 0
            Final = await _Staker.stakerBalance(_Staker.address)
            assert.equal(Final.toString(), '0')

            // check to see if staking status is false
            Final = await _Staker.currentlyStaked(User)
            assert.equal(Final.toString(), 'false'),'the user is not currently staking'
        })
    })
})