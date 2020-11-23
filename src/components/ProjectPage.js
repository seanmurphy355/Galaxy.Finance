import Web3 from 'web3'
import React, { Component } from 'react';
import NavComponent from "./Navbar";
import { Web } from '@material-ui/icons';
import ghost from "./img/icons/home.jpg";
import sky from "./img/icons/sky.webp";
import skull from "./img/icons/move.jpg";
import './Project.css';
import USDC from './abi/USDC.json'
import StakerContract from './abi/StakerContract.json'
import GalaxyToken from './abi/GalaxyToken.json'
import StakerUI from "./UI";
import RewardsUI from "./Rewards"



class ProjectPage extends Component {

  //mount component
  async componentWillMount() {
    await this.loadWeb3()
    await this.LoadData()
  }
  //snag data
  async LoadData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()

    //Load nUSDC
    const _nUSDCData = USDC.networks[networkId]
    if (_nUSDCData) {
      const _nUSDC = new web3.eth.Contract(USDC.abi, _nUSDCData.address)
      this.setState({ _nUSDC })
      let nUSDCBalance = await _nUSDC.methods.Balance(this.state.account).call()
      this.setState({ nUSDCBalance: nUSDCBalance.toString() })
    }
    else {
      window.alert('Token Contract not Deployed')

    }

    //Load Glxy
    const _GlxyData = GalaxyToken.networks[networkId]
    if (_GlxyData) {
      const _Glxy = new web3.eth.Contract(GalaxyToken.abi, _GlxyData.address)
      this.setState({ _Glxy })
      let GlxyBalance = await _Glxy.methods.Balance(this.state.account).call()
      this.setState({ GlxyBalance: GlxyBalance.toString() })
    }
    else {
      window.alert('Token Contract not Deployed')

    }

    //Load the staking Contract info
    const _StakeData = StakerContract.networks[networkId]
    if (_StakeData) {
      const _Stake = new web3.eth.Contract(StakerContract.abi, _StakeData.address)
      this.setState({ _Stake })
      let Staked_Balance = await _Stake.methods.stakerBalance(this.state.account).call()
      this.setState({ Staked_Balance: Staked_Balance.toString() })
    }
    else {
      window.alert('Token Staking Contract has not been Deployed!')
    }

    this.setState({ loading: false })
  }
  //basic load web3 function
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Sorry Meta Mask Not detected!')
    }
  }

  FarmTokens = (amount) => {
    this.setState({ loading: true })
    this.state._nUSDC.methods.approve(this.state._Stake._address, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.state._Stake.methods.FarmTokens(amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })
    })
  }

  UnstakeTokens = (amount) => {
    this.setState({ loading: true })
    this.state._Stake.methods.UnstakeTokens().send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }
 


  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      _Glxy: {},
      _nUSDC: {},
      _Stake: {},
      GlxyBalance: '0',
      nUSDCBalance: '0',
      Staked_Balance: '0',
      loading: true
    }
  }

  render() {
    let UI, Rewards
    UI = <StakerUI Staked_Balance={this.state.Staked_Balance} Glxy_Balance={this.state.GlxyBalance} nUSD_Balance={this.state.nUSDCBalance} My_Stake={this.FarmTokens} _StopStake={this.UnstakeTokens}/>
    Rewards = <RewardsUI GlxyBalance={this.state.GlxyBalance} />


    return (
      <html>
        <body>
          <div class="bg-Two">
            <div className="App">
              <NavComponent account={this.state.account} />
            </div>
            <div class="content-Two">

              <div class="pannel-Two">
                <div class="cd-Two" >
                  <img src={skull} />
                </div>
                <div class="cl-Two" >
                  <p2>Stake and Withdraw</p2>
                </div>
                <div class="cg-Two" >
                  <div class="info-Two">
                    {UI}
                  </div>
                </div>
              </div>
            </div>





            <div class="bg-Three">
              <div className="App">
                <NavComponent account={this.state.account} />
              </div>
              <div class="content-Three">

                <div class="pannel-Three">
                  <div class="cd-Three" >
                    <img src={ghost} />
                  </div>
                  <div class="cl-Three" >
                    <p2>TBD</p2>
                  </div>
                  <div class="cg-Three" >
                    <div class="info-Three">
                    <p1 class ="js"> </p1>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div class="bg-Four">
              <div className="App">
                <NavComponent account={this.state.account} />
              </div>
              <div class="content-Four">

                <div class="pannel-Four">
                  <div class="cd-Four" >
                    <img src={sky} />
                  </div>
                  <div class="cl-Four" >
                    <p2>Staking Info</p2>
                  </div>
                  <div class="cg-Four" >
                    <div class="info-Four">
                      <p> Currently The APY is not stable</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>


          </div>
        </body>
      </html>
    );
  }
}
export default ProjectPage;