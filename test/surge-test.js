const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Surge", function () {

    let Surge;
    let surge;
    let owner;
    let addr1;
    let addr2;
    let addr3;
    let addrs;
    let name = 'Surge';
    let symbol = 'SRG';
    let uri = 'www.surge.org'
    let MAX_PER_USER = 8;
    let MAX_RESERVED_TOKENS = 200;
    let MAX_TOKENS = 10000;
    let TOKEN_PRICE = 50000000000000000n;
    
    beforeEach(async function () {
        // Get the ContractFactory and Signers here.
        Surge = await ethers.getContractFactory("Surge");
        [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners();
        
        // To deploy our contract, we just have to call Token.deploy() and await
        // for it to be deployed(), which happens onces its transaction has been
        // mined.
        surge = await Surge.deploy(name, symbol, uri);
        await surge.deployed();
      });

      describe("Deployment", function () {
        it("Should set the right owner", async function () {
          expect(await surge.owner()).to.equal(owner.address);
        });
    
        it("Should return the right max tokens per user", async function () {
            expect(await surge.MAX_PER_USER()).to.equal(MAX_PER_USER);
        });

        it("Should return the right max reserved tokens", async function () {
            expect(await surge.MAX_RESERVED_TOKENS()).to.equal(MAX_RESERVED_TOKENS);
        });

        it("Should return the right total Gift Mints", async function () {
            expect(await surge.totalGiftMints()).to.equal(0);
        });

        it("Should set saleIsActive as false", async function () {
            expect(await surge.saleIsActive()).to.equal(false);
        });

        it("Should return the right MAX_TOKENS", async function () {
            expect(await surge.MAX_TOKENS()).to.equal(MAX_TOKENS);
        });

        it("Should return the right TOKEN_PRICE", async function () {
            expect(await surge.TOKEN_PRICE()).to.equal(TOKEN_PRICE);
        });

        it("Should return the right baseUri", async function () {
            expect(await surge.baseURI()).to.equal(uri);
        });

        it("Should return the right name", async function () {
            expect(await surge.name()).to.equal(name);
        });

        it("Should return the right name", async function () {
            expect(await surge.symbol()).to.equal(symbol);
        });
      });

      describe("Base URI", function () {
        it("Should allow only owner to change base URI", async function () {
            let newURI = 'www.test.org';
            
            const setBaseURITx = await surge.connect(owner).setBaseURI(newURI);
            await setBaseURITx.wait();
            
            expect(await surge.baseURI()).to.equal(newURI);
        });

        it("Should not allow any address to change base URI", async function () {
            let newURI = 'www.test.org';

            expect(surge.connect(addr1).setBaseURI(newURI)).to.be.revertedWith("Ownable: caller is not the owner");
            
            expect(await surge.baseURI()).to.equal(uri);
        });
      });
});
