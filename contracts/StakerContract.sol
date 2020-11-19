//SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.7.0;

import "./USDC.sol";
import "./GalaxyToken.sol";

contract StakerContract {
    //Start
    string public name = "Glxy Staking Farm";
    //create state variables of type contract that can be used in the constructor.
    GalaxyToken public glxyToken;
    USDC public USDCToken;
    //The owner of the contract i.e deployer address
    address public contract_Owner;

    address[] public stakeUsers;
    mapping(address => uint256) public stakerBalance;
    mapping(address => bool) public wasStaked;
    mapping(address => bool) public currentlyStaked;

    constructor(GalaxyToken _glxyToken, USDC _nUSDCToken) public {
        //special function that runs once when the smart contract is first deployed
        glxyToken = _glxyToken;
        USDCToken = _nUSDCToken;
        contract_Owner = msg.sender;
    }

    //Functions to build
    //1. Stake tokens (allow the user to insert the tokens)
    function FarmTokens(uint256 _amount) public {
        require(_amount > 0, "a balance cannot be equal to 0");
        //Allow the user to transfer nUSDC tokens into the contract
        USDCToken.transferFrom(msg.sender, address(this), _amount);

        //Update staking Balance for user
        stakerBalance[msg.sender] = stakerBalance[msg.sender] + _amount;

        //array to count stakers in if they are stakers array.
        if (!wasStaked[msg.sender]) {
            stakeUsers.push(msg.sender);
        }

        //Update staking status of user
        currentlyStaked[msg.sender] = true;
        wasStaked[msg.sender] = true;
    }

    //Unstake tokens (allow user to pull staked tokens out of the contract)
    function UnstakeTokens() public {
        uint256 user_Balance = stakerBalance[msg.sender];
        require(user_Balance > 0, "staking balance must be greater than 0");
        //give the user their staked tokens back stealing is bad =D and reset the balance to 0
        USDCToken.transfer(msg.sender, user_Balance);
        stakerBalance[msg.sender] = 0;
        currentlyStaked[msg.sender] = false;
    }

    //Distrabution (Give the user native GLXY based off of a APY inorder to allow user to farm native tokens with staked tokens)
    function distributeTokens() public {
        //make sure the only person that can call this function is the contract owner
        require(msg.sender == contract_Owner);

        //Give Galaxy tokens to anyone that is currently staked in our contract.
        for (uint256 i = 0; i < stakeUsers.length; i++) {
            address recipient = stakeUsers[i];
            uint256 user_Balance = stakerBalance[recipient]/10;

            //make sure user balance exists before we send coins
            if (user_Balance > 0) {
                glxyToken.transfer(recipient, user_Balance);
            }
        }
    }
}
