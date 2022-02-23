const { expect } = require('chai');
const { ethers } = require('hardhat');
var crypto = require('crypto');

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
  let uri = 'https://surgewomen.io';
  let MAX_PER_USER = 5;
  let MAX_RESERVED_TOKENS = 120;
  let MAX_TOKENS = 2500;
  let TOKEN_PRICE = 50000000000000000n;
  let decimals = 1000000000000000000;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    Surge = await ethers.getContractFactory('Surge');
    [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners();

    // To deploy our contract, we just have to call Token.deploy() and await
    // for it to be deployed(), which happens once its transaction has been
    // mined.
    surge = await Surge.deploy(name, symbol, uri);
    await surge.deployed();
  });

  describe('Deployment', function () {
    it('Should set the right owner', async function () {
      expect(await surge.owner()).to.equal(owner.address);
    });

    it('Should return the right max tokens per user', async function () {
      expect(await surge.MAX_PER_USER()).to.equal(MAX_PER_USER);
    });

    it('Should return the right max reserved tokens', async function () {
      expect(await surge.MAX_RESERVED_TOKENS()).to.equal(MAX_RESERVED_TOKENS);
    });

    it('Should return the right total Gift Mints', async function () {
      expect(await surge.totalGiftMints()).to.equal(0);
    });

    it('Should set saleIsActive as false', async function () {
      expect(await surge.saleIsActive()).to.equal(false);
    });

    it('Should set presaleIsActive as false', async function () {
      expect(await surge.presaleIsActive()).to.equal(false);
    });

    it('Should return the right MAX_TOKENS', async function () {
      expect(await surge.MAX_TOKENS()).to.equal(MAX_TOKENS);
    });

    it('Should return the right TOKEN_PRICE', async function () {
      expect(await surge.TOKEN_PRICE()).to.equal(TOKEN_PRICE);
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
      const startSaleTx = await surge.connect(owner).startSale();
      await startSaleTx.wait();

      expect(await surge.saleIsActive()).to.equal(true);
    });

    it('Should not allow any address to start sale', async function () {
      expect(surge.connect(addr1).startSale()).to.be.revertedWith('Ownable: caller is not the owner');

      expect(await surge.saleIsActive()).to.equal(false);
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

  describe('Presale whitelisting', function () {
    it('Should allow only owner to add address to presale', async function () {
      const addToPresaleTx = await surge.connect(owner).addToPresale(addr1.address);
      await addToPresaleTx.wait();
    });

    it('Should not allow to add address to presale twice', async function () {
      const addToPresaleTx = await surge.connect(owner).addToPresale(addr1.address);
      await addToPresaleTx.wait();

      expect(surge.connect(owner).addToPresale(addr1.address)).to.be.revertedWith('Wallet is already in the presale');
    });

    it('Should not allow any address to add address to presale', async function () {
      expect(surge.connect(addr1).addToPresale(addr1.address)).to.be.revertedWith('Ownable: caller is not the owner');
    });
  });

  describe('Get Tokens', function () {
    it('Should allow to get tokens owned by given account before minting', async function () {
      const getTokensTx = await surge.connect(owner).getTokens(owner.address);
      expect(getTokensTx.length).to.equal(0);
    });

    it('Should allow to get tokens owned by given account after minting', async function () {
      let receivers = [addr1.address, addr1.address];

      const mintTx = await surge.connect(owner).giftMint(receivers);
      await mintTx.wait();

      expect(await surge.balanceOf(addr1.address)).to.equal(2);

      var getTokensTx = await surge.connect(owner).getTokens(addr1.address);
      const result = Object.values(getTokensTx);
      result.forEach((element, index) => (result[index] = element.toNumber()));

      expect(JSON.stringify(result)).to.equal(JSON.stringify([1, 2]));
    });

    it('Should allow to get tokens owned by given account from a different account', async function () {
      const getTokensTx = await surge.connect(addr1).getTokens(owner.address);
      expect(getTokensTx.length).to.equal(0);
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
      let amountOfTokens = MAX_PER_USER;

      const startSaleTx = await surge.connect(owner).startSale();
      await startSaleTx.wait();
      expect(await surge.saleIsActive()).to.equal(true);

      let price = ((await surge.TOKEN_PRICE()) * amountOfTokens) / decimals;

      const mintTx = await surge.connect(addr1).mint(amountOfTokens, {
        value: ethers.utils.parseEther(price.toString()),
      });
      await mintTx.wait();

      expect(await surge.balanceOf(addr1.address)).to.equal(amountOfTokens);

      expect(surge.connect(addr1).mint(1)).to.be.revertedWith(
        'You already have maximum number of tokens allowed per wallet',
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

      let price = ((await surge.TOKEN_PRICE()) * amountOfTokens) / decimals;

      const mintTx = await surge.connect(addr1).mint(amountOfTokens, {
        value: ethers.utils.parseEther(price.toString()),
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

      const pausePresaleTx = await surge.connect(owner).pausePresale();
      await pausePresaleTx.wait();

      expect(await surge.presaleIsActive()).to.equal(false);

      expect(surge.connect(addr1).presaleMint(amountOfTokens)).to.be.revertedWith('Presale is currently not active');

      expect(await surge.balanceOf(addr1.address)).to.equal(0);
    });

    it('Should not allow an address to presale mint more than 5 tokens per wallet', async function () {
      let amountOfTokens = 5;

      const startPresaleTx = await surge.connect(owner).startPresale();
      await startPresaleTx.wait();

      expect(await surge.presaleIsActive()).to.equal(true);

      const addToPresaleTx = await surge.connect(owner).addToPresale(addr1.address);
      await addToPresaleTx.wait();

      let price = ((await surge.TOKEN_PRICE()) * amountOfTokens) / decimals;

      const presaleMintTx = await surge.connect(addr1).presaleMint(amountOfTokens, {
        value: ethers.utils.parseEther(price.toString()),
      });
      await presaleMintTx.wait();

      expect(await surge.balanceOf(addr1.address)).to.equal(5);

      expect(surge.connect(addr1).presaleMint(1)).to.be.revertedWith('You already have maximum number of tokens allowed per wallet');

      expect(await surge.balanceOf(addr1.address)).to.equal(5);
    });

    it('Should not allow an address to presale mint tokens if not enough ETH', async function () {
      let amountOfTokens = 1;

      const startPresaleTx = await surge.connect(owner).startPresale();
      await startPresaleTx.wait();

      expect(await surge.presaleIsActive()).to.equal(true);

      const addToPresaleTx = await surge.connect(owner).addToPresale(addr1.address);
      await addToPresaleTx.wait();

      expect(surge.connect(addr1).presaleMint(1, {value: ethers.utils.parseEther('0')})).to.be.revertedWith('Incorrect ETH value');

      expect(await surge.balanceOf(addr1.address)).to.equal(0);
    });

    it('Should not allow an address to presale mint tokens if not presale approved', async function () {
      let amountOfTokens = 1;

      const startPresaleTx = await surge.connect(owner).startPresale();
      await startPresaleTx.wait();

      expect(await surge.presaleIsActive()).to.equal(true);

      let price = ((await surge.TOKEN_PRICE()) * amountOfTokens) / decimals;

      expect(surge.connect(addr1).presaleMint(1, {value: ethers.utils.parseEther(price.toString())})).to.be.revertedWith('You are not in the pre-sale');

      expect(await surge.balanceOf(addr1.address)).to.equal(0);
    });

    it('Should allow an address to presale mint a token if address is approved', async function () {
      let amountOfTokens = 1;

      const startPresaleTx = await surge.connect(owner).startPresale();
      await startPresaleTx.wait();

      expect(await surge.presaleIsActive()).to.equal(true);

      const addToPresaleTx = await surge.connect(owner).addToPresale(addr1.address);
      await addToPresaleTx.wait();

      let price = ((await surge.TOKEN_PRICE()) * amountOfTokens) / decimals;

      const presaleMintTx = await surge.connect(addr1).presaleMint(amountOfTokens, {
        value: ethers.utils.parseEther(price.toString()),
      });
      await presaleMintTx.wait();

      expect(await surge.balanceOf(addr1.address)).to.equal(amountOfTokens);
    });
  });

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

    it('Should not allow to gift mint more than 5 tokens per wallet', async function () {
      let receivers = [];

      for (var i = 0; i < MAX_PER_USER; i++) {
        receivers.push(addr1.address);
      }

      const mintTx = await surge.connect(owner).giftMint(receivers);
      await mintTx.wait();

      expect(await surge.balanceOf(addr1.address)).to.equal(MAX_PER_USER);

      expect(surge.connect(owner).giftMint([addr1.address])).to.be.revertedWith(
        'Wallet has max number of tokens allowed',
      );

      expect(await surge.balanceOf(addr1.address)).to.equal(MAX_PER_USER);
    });

    it('Should not allow to gift mint more than MAX_RESERVED_TOKENS', async function () {
      let receivers = [];

      for (var i = 0; i < MAX_RESERVED_TOKENS; i++) {
        var id = crypto.randomBytes(32).toString('hex');
        var privateKey = '0x' + id;
        var wallet = new ethers.Wallet(privateKey);
        receivers.push(wallet.address);
      }

      const mintTx = await surge.connect(owner).giftMint(receivers);
      await mintTx.wait();

      expect(surge.connect(owner).giftMint([addr1.address])).to.be.revertedWith('No available tokens for gifting');
    });
  });

});
