const { ethers } = require('hardhat');


async function main() {
    Surge = await ethers.getContractFactory('Surge');
    surge = await Surge.deploy(name, symbol, uri, price, [multiSig, "0x187265c77d6df911036842f59382aD0589d1b336"], [2, 6], multiSig, royaltyAmount);
    await surge.deployed();
    whitelistAddresses.forEach(address => {
        console.log(address);
        if(address.includes('eth'))
        {
        var tempAddress = await surge.resolveName(address);;
        console.log(tempAddress);
        address = tempAddress;
        }
    });

    console.log(whitelistAddresses);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});