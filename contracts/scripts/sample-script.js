const hre = require('hardhat');

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // deploy escrow contract first
  const Escrow = await hre.ethers.getContractFactory('Escrow');
  const escrow = await Escrow.deploy(["0x5c6B0f7Bf3E7ce046039Bd8FABdfD3f9F5021678", "0x14723A09ACff6D2A60DcdF7aA4AFf308FDDC160C"], [20, 80]);

  await escrow.deployed();

  // We get the contract to deploy
  const name = 'Surge Women Passport';
  const symbol = 'SURGE';
  const baseURI = 'ipfs://CID/';
  const price = 80000000000000000n; //0.08ETH //$250
  let receiver = escrow.address;
  let royaltyAmount = 600; // Divided by 10000

  const Surge = await hre.ethers.getContractFactory('Surge');
  const surge = await Surge.deploy(name, symbol, baseURI, price, receiver, royaltyAmount);

  await surge.deployed();
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
