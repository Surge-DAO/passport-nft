const hre = require('hardhat');

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const name = 'Surge Women Passport';
  const symbol = 'SURGE';
  const baseURI = 'ipfs://CID/';
  const price = 50000000000000000n; //0.05ETH //$250
  let multiSig = "0xD9A52b6506743cF5fAFf14C875cB443da9660e00";
  let royaltyAmount = 200; // Divided by 10000

  const Surge = await hre.ethers.getContractFactory('Surge');
  const surge = await Surge.deploy(name, symbol, baseURI, price, ["0xD9A52b6506743cF5fAFf14C875cB443da9660e00", "0x187265c77d6df911036842f59382aD0589d1b336"], [2, 6], multiSig, royaltyAmount);

  await surge.deployed();
  
  console.log('Surge deployed to:', surge.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
