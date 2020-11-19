//SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.7.0;

//General outline of the GalaxyToken
contract GalaxyToken {
    string public name = "Galaxy.Finance"; // Name of the token
    string public symbol = "GLXY"; // Token Symbol Will be displayed as GLXY when token is deployed
    uint256 public totalSupply = 20000000000000000000000; // Token Supply a max
    uint8 public decimals = 18; // this should be default for all erc20 tokens

    //Transfers Value amount of tokens to address To, and MUST fire the Transfer event.
    //The function SHOULD throw if the message caller's account balance does not have enough tokens to spend.
    event Transfer(address indexed From, address indexed To, uint256 Value);

    // to withdraw From your account multiple times, up to the Value amount.
    // If this function is called again it overwrites the current allowance with Value
    event Approval(
        address indexed Owner,
        address indexed Spender,
        uint256 Value
    );

    // This creates an array with all balances
    mapping(address => uint256) public Balance;
    mapping(address => mapping(address => uint256)) public Amount;

    constructor() public {
        Balance[msg.sender] = totalSupply;
    }

    //Transfers Value amount of tokens to address To, and MUST fire the Transfer event. The function SHOULD throw if the message caller's account balance does not have enough tokens to spend.
    function transfer(address To, uint256 Value) public returns (bool success) {
        require(Balance[msg.sender] >= Value);
        Balance[msg.sender] -= Value;
        Balance[To] += Value;
        emit Transfer(msg.sender, To, Value); //emmision of transfer event
        return true;
    }

    //Sets amount as the allowance of spender over the caller’s tokens.
    function approve(address Spender, uint256 Value)
        public
        returns (bool success)
    {
        Amount[msg.sender][Spender] = Value;
        emit Approval(msg.sender, Spender, Value); //emmision of Approval event
        return true;
    }

    //Moves amount tokens from sender to recipient using the allowance mechanism. amount is then deducted from the caller’s allowance.
    function transferFrom(
        address From,
        address To,
        uint256 Value
    ) public returns (bool success) {
        require(Value <= Balance[From]);
        require(Value <= Amount[From][msg.sender]);
        Balance[From] -= Value;
        Balance[To] += Value;
        Amount[From][msg.sender] -= Value;
        emit Transfer(From, To, Value); //emmision of transfer event
        return true;
    }
}
