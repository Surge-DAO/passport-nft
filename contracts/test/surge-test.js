
// require('@openzeppelin/test-helpers/configure');
// const { expectRevert } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');
const { ethers } = require('hardhat');
const { MerkleTree } = require('merkletreejs');
var keccak256 = require('keccak256');
var crypto = require('crypto');// Apply configuration

describe('Surge', function () {
  let Surge;
  let surge;
  let owner;
  let addr1;
  let addr2;
  let addr3;
  let addrs;
  let name = 'Surge';
  let symbol = 'SRG';
  let uri = 'ipfs://QmWL5dFPbKTawmtuujgDr6X3vF2fne73Qf5P6FGgvFL9gZ/';
  let maxPerUser = 5;
  let maxReserved = 200;
  let maxSupply = 5000;
  //let price = .08 ether;

  const whitelistAddresses = [
    // Hardhat test addresses...
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x976EA74026E726554dB657fA54763abd0C3a0aa9",
    "0x14dC79964da2C08b23698B3D3cc7Ca32193d9955",
    "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f",
    // my test addresses
    "0xCdDB9663B53A9Fbe53f838339e8909441C0cd353",
    "0x4Ea3674531C8Cf80C29fD590F1cd508d4CF8E2E9"
  ];

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    Surge = await ethers.getContractFactory('Surge');
    [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners();

    // To deploy our contract, we just have to call Token.deploy() and await
    // for it to be deployed(), which happens once its transaction has been
    // mined.
    surge = await Surge.deploy(name, symbol, uri, ["0xD9A52b6506743cF5fAFf14C875cB443da9660e00", "0x187265c77d6df911036842f59382aD0589d1b336"], [2, 6]);
    await surge.deployed();
  });

  describe('Deployment', function () {
    it('Should set the correct owner', async function () {
      expect(await surge.owner()).to.equal(owner.address);
    });

    it('Should return the correct max tokens per user', async function () {
      expect(await surge.maxPerUser()).to.equal(maxPerUser);
    });

    it('Should return the correct max reserved tokens', async function () {
      expect(await surge.maxReserved()).to.equal(maxReserved);
    });

    it('Should return the correct total Gift Mints', async function () {
      expect(await surge.totalGiftMints()).to.equal(0);
    });

    it('Should set saleIsActive as false', async function () {
      expect(await surge.saleIsActive()).to.equal(false);
    });

    it('Should set presaleIsActive as false', async function () {
      expect(await surge.presaleIsActive()).to.equal(false);
    });

    it('Should return the right maxSupply', async function () {
      expect(await surge.maxSupply()).to.equal(maxSupply);
    });

    // it('Should return the right price', async function () {
    //   expect(await surge.price()).to.equal(price);
    // });

    it('Should return the right baseTokenUri', async function () {
      expect(await surge.baseTokenURI()).to.equal(uri);
    });

    it('Should return the right name', async function () {
      expect(await surge.name()).to.equal(name);
    });

    it('Should return the right name', async function () {
      expect(await surge.symbol()).to.equal(symbol);
    });
  });

  describe('Base URI', function () {
    it('Should allow only owner to change base URI', async function () {
      let newURI = 'www.test.org';

      const setBaseURITx = await surge.connect(owner).setBaseURI(newURI);
      await setBaseURITx.wait();

      expect(await surge.baseTokenURI()).to.equal(newURI);
    });

    it('Should not allow any address to change base URI', async function () {
      let newURI = 'www.test.org';

      expect(surge.connect(addr1).setBaseURI(newURI)).to.be.revertedWith('Ownable: caller is not the owner');

      expect(await surge.baseTokenURI()).to.equal(uri);
    });
  });

  describe('Start/Pause sale', function () {
    it('Should allow only owner to start sale', async function () {
      const startSaleTx = await surge.connect(owner).startSale();
      await startSaleTx.wait();

      expect(await surge.saleIsActive()).to.equal(true);
    });

    it('Should not allow any address to start sale', async function () {
      expect(surge.connect(addr1).startSale()).to.be.revertedWith('Ownable: caller is not the owner');

      expect(await surge.saleIsActive()).to.equal(false);
    });

    describe('Withdraw ERC Tokens', function () {
      it('Should not allow any address to withdraw ERC20 Tokens', async function () {
        expect(surge.connect(addr1).withdrawTokens("0xdAC17F958D2ee523a2206206994597C13D831ec7")).to.be.revertedWith('Ownable: caller is not the owner');
      });
  
      it('Should allow only owner to withdraw ERC20 tokens', async function () {
        Token = await ethers.getContractFactory('ERC20TestToken');
        token = await Token.deploy();
        await token.deployed();
        const withdrawTokensTx = await surge.connect(owner).withdrawTokens(token.address);
        await withdrawTokensTx.wait();
      });
    });

    it('Should allow only owner to pause sale', async function () {
      const startSaleTx = await surge.connect(owner).startSale();
      await startSaleTx.wait();

      expect(await surge.saleIsActive()).to.equal(true);

      const pauseSaleTx = await surge.connect(owner).pauseSale();
      await pauseSaleTx.wait();

      expect(await surge.saleIsActive()).to.equal(false);
    });

    it('Should not allow any address to pause sale', async function () {
      expect(surge.connect(addr1).pauseSale()).to.be.revertedWith('Ownable: caller is not the owner');

      expect(await surge.saleIsActive()).to.equal(false);
    });
  });

  describe('Start/Pause presale', function () {
    it('Should allow only owner to start presale', async function () {
      const startPresaleTx = await surge.connect(owner).startPresale();
      await startPresaleTx.wait();

      expect(await surge.presaleIsActive()).to.equal(true);
    });

    it('Should not allow any address to start presale', async function () {
      expect(surge.connect(addr1).startPresale()).to.be.revertedWith('Ownable: caller is not the owner');

      expect(await surge.presaleIsActive()).to.equal(false);
    });

    it('Should allow only owner to pause presale', async function () {
      const startPresaleTx = await surge.connect(owner).startPresale();
      await startPresaleTx.wait();

      expect(await surge.presaleIsActive()).to.equal(true);

      const pausePresaleTx = await surge.connect(owner).pausePresale();
      await pausePresaleTx.wait();

      expect(await surge.presaleIsActive()).to.equal(false);
    });

    it('Should not allow any address to pause presale', async function () {
      expect(surge.connect(addr1).pausePresale()).to.be.revertedWith('Ownable: caller is not the owner');

      expect(await surge.presaleIsActive()).to.equal(false);
    });
  });
  // it('PreSaleMint sale', async function () {
  //   // Build MerkleTree
  //   const leafNodes = whitelistAddresses.map(addr => keccak256(addr));
  //   const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
  //   const rootHash = merkleTree.getRoot();
  //   // Update the root hash
  //   await (await contract.setMerkleRoot('0x' + rootHash.toString('hex'))).wait();

  //   await contract.startPresale();

  //   await contract.connect(whitelistedUser).presaleMint(
  //     1,
  //     merkleTree.getHexProof(keccak256(await whitelistedUser.getAddress())),
  //     {value: getPrice(price, 1)},
  //   );
  //   // Trying to mint twice
  //   await expect(contract.connect(whitelistedUser).whitelistMint(
  //     1,
  //     merkleTree.getHexProof(keccak256(await whitelistedUser.getAddress())),
  //     {value: getPrice(price, 1)},
  //   )).to.be.revertedWith('Address already claimed!');
  //   // Sending an invalid mint amount
  //   await expect(contract.connect(whitelistedUser).whitelistMint(
  //     await (await contract.maxMintAmountPerTx()).add(1),
  //     merkleTree.getHexProof(keccak256(await whitelistedUser.getAddress())),
  //     {value: getPrice(price, await (await contract.maxMintAmountPerTx()).add(1).toNumber())},
  //   )).to.be.revertedWith('Invalid mint amount!');
  //   // Sending insufficient funds
  //   await expect(contract.connect(whitelistedUser).whitelistMint(
  //     1,
  //     merkleTree.getHexProof(keccak256(await whitelistedUser.getAddress())),
  //     {value: getPrice(price, 1).sub(1)},
  //   )).to.be.rejectedWith(Error, 'insufficient funds for intrinsic transaction cost');
  //   // Pretending to be someone else
  //   await expect(contract.connect(holder).whitelistMint(
  //     1,
  //     merkleTree.getHexProof(keccak256(await whitelistedUser.getAddress())),
  //     {value: getPrice(price, 1)},
  //   )).to.be.revertedWith('Invalid proof!');
  //   // Sending an invalid proof
  //   await expect(contract.connect(holder).whitelistMint(
  //     1,
  //     merkleTree.getHexProof(keccak256(await holder.getAddress())),
  //     {value: getPrice(price, 1)},
  //   )).to.be.revertedWith('Invalid proof!');
  //   // Sending no proof at all
  //   await expect(contract.connect(holder).whitelistMint(
  //     1,
  //     [],
  //     {value: getPrice(price, 1)},
  //   )).to.be.revertedWith('Invalid proof!');
    
  //   // Pause whitelist sale
  //   await contract.setWhitelistMintEnabled(false);
  //   await contract.setCost(utils.parseEther(CollectionConfig.preSale.price.toString()));

  //   // Check balances
  //   expect(await contract.balanceOf(await owner.getAddress())).to.equal(1);
  //   expect(await contract.balanceOf(await whitelistedUser.getAddress())).to.equal(2);
  //   expect(await contract.balanceOf(await holder.getAddress())).to.equal(0);
  //   expect(await contract.balanceOf(await externalUser.getAddress())).to.equal(0);
  // });
  describe('Presale whitelisting', function () {
    // it('Should allow only owner to add address to presale', async function () {
    //   const addToPresaleTx = await surge.connect(owner).addToPresale(addr1.address);
    //   await addToPresaleTx.wait();
    // });

    // it('Should not allow to add address to presale twice', async function () {
    //   const addToPresaleTx = await surge.connect(owner).addToPresale(addr1.address);
    //   await addToPresaleTx.wait();

    //   expect(surge.connect(owner).addToPresale(addr1.address)).to.be.revertedWith('Wallet is already in the presale');
    // });

    it('Should not allow any address to add address to presale', async function () {
      expect(surge.connect(addr1).addToPresale(addr1.address)).to.be.revertedWith('Ownable: caller is not the owner');
    });
  });

  describe('Mint', function () {
    it('Should not allow to mint tokens is sale is not active', async function () {
      let amountOfTokens = 1;

      expect(await surge.saleIsActive()).to.equal(false);

      expect(surge.connect(addr1).mint(amountOfTokens)).to.be.revertedWith('Sale is currently not active');

      expect(await surge.balanceOf(addr1.address)).to.equal(0);
    });

    it('Should not allow to mint more than 5 tokens per wallet', async function () {
      let amountOfTokens = maxPerUser;

      const startSaleTx = await surge.connect(owner).startSale();
      await startSaleTx.wait();
      expect(await surge.saleIsActive()).to.equal(true);

      let price = ((await surge.price()) * amountOfTokens) / decimals;

      const mintTx = await surge.connect(addr1).mint(amountOfTokens, {
        value: ethers.utils.parseEther(price.toString())
      });
      await mintTx.wait();

      expect(await surge.balanceOf(addr1.address)).to.equal(amountOfTokens);

      expect(surge.connect(addr1).mint(1)).to.be.revertedWith(
        'You already have maximum number of tokens allowed per wallet'
      );

      expect(await surge.balanceOf(addr1.address)).to.equal(amountOfTokens);
    });

    it('Should not allow to mint a token if user has not enough eth', async function () {
      let amountOfTokens = 1;

      const startSaleTx = await surge.connect(owner).startSale();
      await startSaleTx.wait();
      expect(await surge.saleIsActive()).to.equal(true);

      expect(surge.connect(addr1).mint(amountOfTokens)).to.be.revertedWith('Incorrect ETH value');

      expect(await surge.balanceOf(addr1.address)).to.equal(0);
    });

    it('Should not allow user to mint a token', async function () {
      let amountOfTokens = 1;

      const startSaleTx = await surge.connect(owner).startSale();
      await startSaleTx.wait();
      expect(await surge.saleIsActive()).to.equal(true);

      let price = ((await surge.price()) * amountOfTokens) / decimals;

      const mintTx = await surge.connect(addr1).mint(amountOfTokens, {
        value: ethers.utils.parseEther(price.toString())
      });
      await mintTx.wait();

      expect(await surge.balanceOf(addr1.address)).to.equal(amountOfTokens);
    });
  });

  describe('Withdraw', function () {
    it('Should allow only owner to withdraw', async function () {
      const withdrawAllTx = await surge.connect(owner).withdrawAll();
      await withdrawAllTx.wait();
    });

    it('Should not allow any address to withdraw', async function () {
      expect(surge.connect(addr1).withdrawAll()).to.be.revertedWith('Ownable: caller is not the owner');
    });
  });

  // describe('Presale Mint', function () {
  //   it('Should not allow an address to presale mint tokens if presale is not active', async function () {
  //     let amountOfTokens = 1;

  //     const pausePresaleTx = await surge.connect(owner).pausePresale();
  //     await pausePresaleTx.wait();

  //     expect(await surge.presaleIsActive()).to.equal(false);

  //     expect(surge.connect(addr1).presaleMint(amountOfTokens)).to.be.revertedWith('Presale is currently not active');

  //     expect(await surge.balanceOf(addr1.address)).to.equal(0);
  //   });

  //   it('Should not allow an address to presale mint more than 5 tokens per wallet', async function () {
  //     let amountOfTokens = 5;

  //     const startPresaleTx = await surge.connect(owner).startPresale();
  //     await startPresaleTx.wait();

  //     expect(await surge.presaleIsActive()).to.equal(true);

  //     const addToPresaleTx = await surge.connect(owner).addToPresale(addr1.address);
  //     await addToPresaleTx.wait();

  //     let price = ((await surge.price()) * amountOfTokens) / decimals;

  //     const presaleMintTx = await surge.connect(addr1).presaleMint(amountOfTokens, {
  //       value: ethers.utils.parseEther(price.toString())
  //     });
  //     await presaleMintTx.wait();

  //     expect(await surge.balanceOf(addr1.address)).to.equal(5);

  //     expect(surge.connect(addr1).presaleMint(1)).to.be.revertedWith(
  //       'You already have maximum number of tokens allowed per wallet'
  //     );

  //     expect(await surge.balanceOf(addr1.address)).to.equal(5);
  //   });

  //   it('Should not allow an address to presale mint tokens if not enough ETH', async function () {
  //     let amountOfTokens = 1;

  //     const startPresaleTx = await surge.connect(owner).startPresale();
  //     await startPresaleTx.wait();

  //     expect(await surge.presaleIsActive()).to.equal(true);

  //     const addToPresaleTx = await surge.connect(owner).addToPresale(addr1.address);
  //     await addToPresaleTx.wait();

  //     expect(surge.connect(addr1).presaleMint(1, { value: ethers.utils.parseEther('0') })).to.be.revertedWith(
  //       'Incorrect ETH value'
  //     );

  //     expect(await surge.balanceOf(addr1.address)).to.equal(0);
  //   });

  //   it('Should not allow an address to presale mint tokens if not presale approved', async function () {
  //     let amountOfTokens = 1;

  //     const startPresaleTx = await surge.connect(owner).startPresale();
  //     await startPresaleTx.wait();

  //     expect(await surge.presaleIsActive()).to.equal(true);

  //     let price = ((await surge.price()) * amountOfTokens) / decimals;

  //     expect(
  //       surge.connect(addr1).presaleMint(1, { value: ethers.utils.parseEther(price.toString()) })
  //     ).to.be.revertedWith('You are not in the pre-sale');

  //     expect(await surge.balanceOf(addr1.address)).to.equal(0);
  //   });

  //   it('Should allow an address to presale mint a token if address is approved', async function () {
  //     let amountOfTokens = 1;

  //     const startPresaleTx = await surge.connect(owner).startPresale();
  //     await startPresaleTx.wait();

  //     expect(await surge.presaleIsActive()).to.equal(true);

  //     const addToPresaleTx = await surge.connect(owner).addToPresale(addr1.address);
  //     await addToPresaleTx.wait();

  //     let price = ((await surge.price()) * amountOfTokens) / decimals;

  //     const presaleMintTx = await surge.connect(addr1).presaleMint(amountOfTokens, {
  //       value: ethers.utils.parseEther(price.toString())
  //     });
  //     await presaleMintTx.wait();

  //     expect(await surge.balanceOf(addr1.address)).to.equal(amountOfTokens);
  //   });
  // });

  describe('Gift Mint', function () {
    it('Should not allow any address to gift mint tokens', async function () {
      let receivers = [addr1.address];

      expect(surge.connect(addr1).giftMint(receivers)).to.be.revertedWith('Ownable: caller is not the owner');

      expect(await surge.balanceOf(addr1.address)).to.equal(0);
    });

    it('Should allow owner to gift mint tokens', async function () {
      let receivers = [addr1.address, addr2.address, addr3.address];

      const mintTx = await surge.connect(owner).giftMint(receivers);
      await mintTx.wait();

      expect(await surge.balanceOf(addr1.address)).to.equal(1);
      expect(await surge.balanceOf(addr2.address)).to.equal(1);
      expect(await surge.balanceOf(addr3.address)).to.equal(1);
    });
  });
});
