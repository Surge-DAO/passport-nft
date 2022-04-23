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
  let uri = 'https://www.surgewomen.io/';
  let multiSig = "0x5c6B0f7Bf3E7ce046039Bd8FABdfD3f9F5021678";
  let royaltyAmount = 600; // Divided by 10000
  let MAX_PER_USER = 5;
  let MAX_SUPPLY = 5000;
  let price = 80000000000000000n;
  let decimals = 1000000000000000000;
  const SaleStatus = {
    Paused: 0,
    Presale: 1,
    PublicSale: 2,
    SoldOut: 3
  };

  let whitelistAddresses = [
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x976EA74026E726554dB657fA54763abd0C3a0aa9",
    "0x14dC79964da2C08b23698B3D3cc7Ca32193d9955",
    "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f",
  ];

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    Surge = await ethers.getContractFactory('Surge');
    [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners();

    // To deploy our contract, we just have to call Token.deploy() and await
    // for it to be deployed(), which happens once its transaction has been
    // mined.
    surge = await Surge.deploy(name, symbol, uri, price, multiSig, royaltyAmount);
    await surge.deployed();
  });

  describe('Deployment', function () {
    it('Should set the correct owner', async function () {
      expect(await surge.owner()).to.equal(owner.address);
    });

    it('Should return the correct max tokens per user', async function () {
      expect(await surge.MAX_PER_USER()).to.equal(MAX_PER_USER);
    });

    it('Should set SaleStatus to Presale', async function () {
      await surge.connect(owner).setStatus(SaleStatus.Presale);
      expect(await surge.status()).to.equal(SaleStatus.Presale);
    });

    it('Should return the right MAX_SUPPLY', async function () {
      expect(await surge.MAX_SUPPLY()).to.equal(MAX_SUPPLY);
    });

    it('Should return the right price', async function () {
      expect(await surge.price()).to.equal(price);
    });

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
      const startSaleTx = await surge.connect(owner).setStatus(SaleStatus.PublicSale);
      await startSaleTx.wait();

      expect(await surge.status()).to.equal(SaleStatus.PublicSale);
    });

    it('Should not allow any address to start sale', async function () {
      expect(surge.connect(addr1).setStatus()).to.be.revertedWith('Ownable: caller is not the owner');

      expect(await surge.status()).to.equal(SaleStatus.Paused);
    });

    it('Should allow only owner to pause sale', async function () {
      const startPreSaleTx = await surge.connect(owner).setStatus(SaleStatus.PublicSale);
      await startPreSaleTx.wait();

      expect(await surge.status()).to.equal(SaleStatus.PublicSale);

      const pauseSaleTx = await surge.connect(owner).setStatus(SaleStatus.Paused);
      await pauseSaleTx.wait();

      expect(await surge.status()).to.equal(SaleStatus.Paused);
    });

    it('Should not allow any address to pause sale', async function () {
      expect(surge.connect(addr1).setStatus(SaleStatus.PublicSale)).to.be.revertedWith('Ownable: caller is not the owner');

      expect(await surge.status()).to.equal(SaleStatus.Paused);
    });
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

  describe('Start/Pause presale', function () {
    it('Should allow only owner to start presale', async function () {
      const startPresaleTx = await surge.connect(owner).setStatus(SaleStatus.Presale);
      await startPresaleTx.wait();

      expect(await surge.status()).to.equal(SaleStatus.Presale);
    });

    it('Should not allow any address to start presale', async function () {
      expect(surge.connect(addr1).setStatus(SaleStatus.Presale)).to.be.revertedWith('Ownable: caller is not the owner');

      expect(await surge.status()).to.equal(SaleStatus.Paused);
    });

    it('Should allow only owner to pause presale', async function () {
      const startPresaleTx = await surge.connect(owner).setStatus(SaleStatus.Presale);
      await startPresaleTx.wait();

      expect(await surge.status()).to.equal(SaleStatus.Presale);

      const pausePresaleTx = await surge.connect(owner).setStatus(SaleStatus.Paused);
      await pausePresaleTx.wait();

      expect(await surge.status()).to.equal(SaleStatus.Paused);
    });

    it('Should not allow any address to pause presale', async function () {
      expect(surge.connect(addr1).setStatus(SaleStatus.Presale)).to.be.revertedWith('Ownable: caller is not the owner');

      expect(await surge.status()).to.equal(SaleStatus.Paused);
    });
  });

  describe('PreSaleMint sale', function () {
    it('PreSaleMint sale', async function () {
      let amountOfTokens = 1;
      // Build MerkleTree
      const leafNodes = whitelistAddresses.map(addr => keccak256(addr));
      const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true});
      const rootHash = merkleTree.getRoot();
      // Update the root hash
      await (await surge.setMerkleRoot('0x' + rootHash.toString('hex'))).wait();

      const startPresaleTx = await surge.connect(owner).setStatus(SaleStatus.Presale);
      await startPresaleTx.wait();

      expect(await surge.status()).to.equal(SaleStatus.Presale);

      let price = ((await surge.price()) * amountOfTokens) / decimals;

      await surge.connect(addr1).presaleMint(
        1,
        merkleTree.getHexProof(keccak256(whitelistAddresses[0])),
        {value: ethers.utils.parseEther(price.toString())},
      );

      // Trying to mint twice
      await expect(surge.connect(addr1).presaleMint(
        5,
        merkleTree.getHexProof(keccak256(whitelistAddresses[0])),
        {value: ethers.utils.parseEther(price.toString())},
      )).to.be.revertedWith('Max amount minted');

      // Sending an invalid mint amount
      await expect(surge.connect(addr1).presaleMint(
        1,
        merkleTree.getHexProof(keccak256(whitelistAddresses[0])),
        {value: ethers.utils.parseEther((price + 1).toString())},
      )).to.be.revertedWith('Not enough ETH');

      // Sending insufficient funds
      await expect(surge.connect(addr1).presaleMint(
        1,
        merkleTree.getHexProof(keccak256(whitelistAddresses[0])),
        {value: ethers.utils.parseEther((price + 1).toString())},
      )).to.be.revertedWith('Not enough ETH');

      // Pretending to be someone else
      await expect(surge.connect(addrs[9]).presaleMint(
        1,
        merkleTree.getHexProof(keccak256(whitelistAddresses[0])),
        {value: ethers.utils.parseEther(price.toString())},
      )).to.be.revertedWith('Not in presale list');

      // Sending an invalid proof
      await expect(surge.connect(addrs[9]).presaleMint(
        1,
        merkleTree.getHexProof(keccak256(addrs[9].address)),
        {value: ethers.utils.parseEther(price.toString())},
      )).to.be.revertedWith('Not in presale list');

      // Sending no proof at all
      await expect(surge.connect(addr1).presaleMint(
        1,
        [],
        {value: ethers.utils.parseEther(price.toString())},
      )).to.be.revertedWith('Not in presale list');

      // Pause whitelist sale
      const pausePresaleTx = await surge.connect(owner).setStatus(SaleStatus.Paused);
      await pausePresaleTx.wait();

      expect(await surge.status()).to.equal(SaleStatus.Paused);

      // Check balances
      expect(await surge.balanceOf(owner.address)).to.equal(0);
      expect(await surge.balanceOf(addr1.address)).to.equal(1);
      expect(await surge.balanceOf(addrs[9].address)).to.equal(0);
    });
  });

  describe('Mint', function () {
    it('Should not allow to mint tokens is sale is not active', async function () {
      let amountOfTokens = 1;

      expect(await surge.status()).to.equal(SaleStatus.Paused);

      expect(surge.connect(addr1).mint(addr1.address, amountOfTokens)).to.be.revertedWith('Sale is currently not active');

      expect(await surge.balanceOf(addr1.address)).to.equal(0);
    });

    it('Should not allow to mint more than 5 tokens per wallet', async function () {
      let amountOfTokens = MAX_PER_USER;

      const startSaleTx = await surge.connect(owner).setStatus(SaleStatus.PublicSale);
      await startSaleTx.wait();
      expect(await surge.status()).to.equal(SaleStatus.PublicSale);

      let price = ((await surge.price()) * amountOfTokens) / decimals;

      const mintTx = await surge.connect(addr1).mint(addr1.address, amountOfTokens, {
        value: ethers.utils.parseEther(price.toString())
      });
      await mintTx.wait();

      expect(await surge.balanceOf(addr1.address)).to.equal(amountOfTokens);

      expect(surge.connect(addr1).mint(addr1.address, 1)).to.be.revertedWith(
        'Already have Max'
      );

      expect(await surge.balanceOf(addr1.address)).to.equal(amountOfTokens);
    });

    it('Should not allow to mint a token if user has not enough eth', async function () {
      let amountOfTokens = 1;

      const startSaleTx = await surge.connect(owner).setStatus(SaleStatus.PublicSale);
      await startSaleTx.wait();
      expect(await surge.status()).to.equal(SaleStatus.PublicSale);

      expect(surge.connect(addr1).mint(addr1.address, amountOfTokens)).to.be.revertedWith('Not enough ETH');

      expect(await surge.balanceOf(addr1.address)).to.equal(0);
    });

    it('Should not allow user to mint a token', async function () {
      let amountOfTokens = 1;

      const startSaleTx = await surge.connect(owner).setStatus(SaleStatus.PublicSale);
      await startSaleTx.wait();
      expect(await surge.status()).to.equal(SaleStatus.PublicSale);

      let price = ((await surge.price()) * amountOfTokens) / decimals;

      const mintTx = await surge.connect(addr1).mint(addr1.address, amountOfTokens, {
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

  describe('Presale Mint', function () {
    it('Should not allow an address to presale mint tokens if presale is not active', async function () {
      let amountOfTokens = 1;

      const pausePresaleTx = await surge.connect(owner).setStatus(SaleStatus.Paused);
      await pausePresaleTx.wait();

      expect(await surge.status()).to.equal(SaleStatus.Paused);

      expect(surge.connect(addr1).presaleMint(amountOfTokens)).to.be.revertedWith('Presale is currently not active');

      expect(await surge.balanceOf(addr1.address)).to.equal(0);
    });

    it('Should not allow an address to presale mint more than 5 tokens per wallet', async function () {
      let amountOfTokens = 5;

      const startPresaleTx = await surge.connect(owner).setStatus(SaleStatus.Presale);
      await startPresaleTx.wait();

      expect(await surge.status()).to.equal(SaleStatus.Presale);

      // Build MerkleTree
      const leafNodes = whitelistAddresses.map(addr => keccak256(addr));
      const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true});
      const rootHash = merkleTree.getRoot();

      // Update the root hash
      await (await surge.setMerkleRoot('0x' + rootHash.toString('hex'))).wait();

      let price = ((await surge.price()) * amountOfTokens) / decimals;

      const hexProof = merkleTree.getHexProof(keccak256(addr1.address));

      const presaleMintTx = await surge.connect(addr1).presaleMint(amountOfTokens, hexProof, {
        value: ethers.utils.parseEther(price.toString())
      });
      await presaleMintTx.wait();

      expect(await surge.balanceOf(addr1.address)).to.equal(5);

      expect(surge.connect(addr1).presaleMint(1)).to.be.revertedWith(
        'You already have maximum number of tokens allowed per wallet'
      );

      expect(await surge.balanceOf(addr1.address)).to.equal(5);
    });

    it('Should not allow an address to presale mint tokens if not enough ETH', async function () {
      let amountOfTokens = 1;

      const startPresaleTx = await surge.connect(owner).setStatus(SaleStatus.Presale);
      await startPresaleTx.wait();

      expect(await surge.status()).to.equal(SaleStatus.Presale);

      // Build MerkleTree
      const leafNodes = whitelistAddresses.map(addr => keccak256(addr));
      const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true});
      const rootHash = merkleTree.getRoot();

      // Update the root hash
      await (await surge.setMerkleRoot('0x' + rootHash.toString('hex'))).wait();

      const hexProof = merkleTree.getHexProof(keccak256(addr1.address));

      expect(surge.connect(addr1).presaleMint(1, hexProof, { value: ethers.utils.parseEther('0') })).to.be.revertedWith(
        'Not enough ETH'
      );

      expect(await surge.balanceOf(addr1.address)).to.equal(0);
    });

    it('Should not allow an address to presale mint tokens if not presale approved', async function () {
      let amountOfTokens = 1;

      const startPresaleTx = await surge.connect(owner).setStatus(SaleStatus.Presale);
      await startPresaleTx.wait();

      expect(await surge.status()).to.equal(SaleStatus.Presale);

      // Build MerkleTree
      const leafNodes = whitelistAddresses.map(addr => keccak256(addr));
      const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true});
      const rootHash = merkleTree.getRoot();

      // Update the root hash
      await (await surge.setMerkleRoot('0x' + rootHash.toString('hex'))).wait();

      let price = ((await surge.price()) * amountOfTokens) / decimals;

      const hexProof = merkleTree.getHexProof(keccak256(addr1.address));

      expect(
        surge.connect(addr1).presaleMint(1, hexProof, { value: ethers.utils.parseEther(price.toString()) })
      ).to.be.revertedWith('You are not in the pre-sale');

      expect(await surge.balanceOf(addr1.address)).to.equal(0);
    });

    it('Should allow an address to presale mint a token if address is approved', async function () {
      let amountOfTokens = 1;

      const startPresaleTx = await surge.connect(owner).setStatus(SaleStatus.Presale);
      await startPresaleTx.wait();

      expect(await surge.status()).to.equal(SaleStatus.Presale);

      // Build MerkleTree
      const leafNodes = whitelistAddresses.map(addr => keccak256(addr));
      const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true});
      const rootHash = merkleTree.getRoot();

      // Update the root hash
      await (await surge.setMerkleRoot('0x' + rootHash.toString('hex'))).wait();

      let price = ((await surge.price()) * amountOfTokens) / decimals;

      const hexProof = merkleTree.getHexProof(keccak256(addr1.address));

      const presaleMintTx = await surge.connect(addr1).presaleMint(amountOfTokens, hexProof, {
        value: ethers.utils.parseEther(price.toString())
      });
      await presaleMintTx.wait();

      expect(await surge.balanceOf(addr1.address)).to.equal(amountOfTokens);
    });
  });

  describe('Batch Mint', function () {
    //Figure out why it does not think batchMinting is a method
    it('Should not allow any address to batch mint tokens', async function () {
      let amountOfTokens = 1;
      let price = ((await surge.price()) * amountOfTokens) / decimals;

      expect(surge.connect(addr1).batchMinting(amountOfTokens, {
        value: ethers.utils.parseEther(price.toString())})).to.be.revertedWith('Ownable: caller is not the owner');

      expect(await surge.balanceOf(addr1.address)).to.equal(0);
    });

    it('Should allow owner to batch mint tokens', async function () {
      let amountOfTokens = 20;
      let price = ((await surge.price()) * amountOfTokens) / decimals;

      const mintTx = await surge.connect(owner).batchMinting(amountOfTokens, {
        value: ethers.utils.parseEther(price.toString())});
      await mintTx.wait();

      expect(await surge.balanceOf(owner.address)).to.equal(amountOfTokens);
    });
  });
});
