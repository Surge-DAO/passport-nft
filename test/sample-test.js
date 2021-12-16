const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Surge", function () {
  it("Should return the new surge once it's changed", async function () {
    const Surge = await ethers.getContractFactory("Surge");
    const surge = await Surge.deploy("", "", "");
    await surge.deployed();

    //expect(await su.greet()).to.equal("Hello, world!");

    //const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    //await setGreetingTx.wait();

    //expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
