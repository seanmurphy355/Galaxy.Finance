import { LabelRounded } from '@material-ui/icons'
import React, { Component } from 'react'
import './ui.css';
import skull from "./img/icons/1.PNG";



class StakerUI extends Component {
    render() {
        return (
            <div id="content" className="mt-3">
                <table className="table table-borderless text-center">
                    <thead>
                        <tr>
                            <th scope="col">Current Staked Balance</th>
                            <th scope="col">Reward Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{window.web3.utils.fromWei(this.props.Staked_Balance, 'Ether')} nUSDC</td>
                            <td>{window.web3.utils.fromWei(this.props.Glxy_Balance, 'Ether')} GLXY</td>
                        </tr>
                    </tbody>
                </table>
                <div className="card mb-4" >
                    <div className="card-body">
                        <form className="mb-5" onSubmit={(event) => {
                            event.preventDefault()
                            let amount
                            amount = this.input.value.toString()
                            amount = window.web3.utils.toWei(amount, 'Ether')
                            this.props.My_Stake(amount)
                        }}>
                            <div>
                                <label className="float-left"><b></b></label>
                                <span className="float-right">
                                   Current nUSDC Balance: {window.web3.utils.fromWei(this.props.nUSD_Balance, 'Ether')}
                                </span>
                            </div>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    ref={(input) => { this.input = input }}
                                    className="form-control form-control-lg"
                                    placeholder="Enter amount you would like to stake"
                                    required />
                           
                            </div>
                            <button type="submit" className="btn btn-primary btn-block btn-lg .btn-responsive">Stake Tokens</button>
                        </form>
                        <button
                            type="submit"
                            className="btn btn-primary btn-block btn-lg .btn-responsive"
                            onClick={(event) => {
                                event.preventDefault()
                                this.props._StopStake()
                            }}>UnStake and Claim Rewards</button>

                    </div>
                </div>

            </div>
        );
    }
}

export default StakerUI;