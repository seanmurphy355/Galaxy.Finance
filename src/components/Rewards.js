import React,{ Component } from 'react'

class RewardsUI extends Component{
render(){
    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Current Glxy Claimable Rewards</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{window.web3.utils.fromWei(this.props.GlxyBalance,'Ether')} Glxy</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
}

export default RewardsUI;