const { expect } = require('chai');
const { ethers } = require('hardhat');
var crypto = require('crypto');// Apply configuration

describe('Escrow', function () {
    let Escrow;
    let escrow;
    let owner;
    let addr1;
    let addr2;
    let addr3;
    let addrs;
    let payees = ["0xD9A52b6506743cF5fAFf14C875cB443da9660e00", "0x187265c77d6df911036842f59382aD0589d1b336"];
    let shares = [2, 6];

    beforeEach(async function () {
      // Get the ContractFactory and Signers here.
      Escrow = await ethers.getContractFactory('Escrow');
      [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners();
  
      escrow = await Escrow.deploy(payees, shares);
      await escrow.deployed();
    });

    describe('Deployment', function () {
        it('Should set the correct payees', async function () {
          expect(await escrow.payee(1)).to.equal(payees[1]);
        });
        it('Should set the correct shares', async function () {
          expect(await escrow.shares(payees[1])).to.equal(shares[1]);
        });
    });
});
