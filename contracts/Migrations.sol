//https://www.trufflesuite.com/docs/truffle/getting-started/running-migrations
//Info: Truffle requires you to have a Migrations contract in order to use the Migrations feature. This contract must contain a specific interface
// For most projects, this contract will be deployed initially as the first migration and won't be updated again. You will also receive this contract by default when creating a new project with truffle init.
pragma solidity >=0.5.0 <0.7.0;

contract Migrations {
    address public owner;
    uint256 public last_completed_migration;

    constructor() public {
        owner = msg.sender;
    }

    modifier restricted() {
        if (msg.sender == owner) _;
    }

    //Compete migration
    function setCompleted(uint256 completed) public restricted {
        last_completed_migration = completed;
    }

    // Update to current Migration if need be last_completed stores a number that
    // exists with our last completed migration. It ensures that our scripts are up to date.
    function upgrade(address new_address) public restricted {
        Migrations upgraded = Migrations(new_address);
        upgraded.setCompleted(last_completed_migration);
    }
}
