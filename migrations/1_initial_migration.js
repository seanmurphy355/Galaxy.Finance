const Migrations = artifacts.require("Migrations");
//I get these files with the gensis of a truffle project.
module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
