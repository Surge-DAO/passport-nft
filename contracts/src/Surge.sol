// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// @title: Surge Women NFT Collection
// @website : https://www.surgewomen.io/

// █▀ █░█ █▀█ █▀▀ █▀▀   █░█░█ █▀█ █▀▄▀█ █▀▀ █▄░█
// ▄█ █▄█ █▀▄ █▄█ ██▄   ▀▄▀▄▀ █▄█ █░▀░█ ██▄ █░▀█
import "hardhat/console.sol";
import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import '@openzeppelin/contracts/utils/cryptography/MerkleProof.sol';
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/finance/PaymentSplitter.sol";

contract Surge is ERC721A, ReentrancyGuard, Ownable, PaymentSplitter {
    using Strings for uint256;

    bytes32 public merkleRoot;

    bool public saleIsActive = false;
    bool public presaleIsActive = false;

    uint256 public price = 0.08 ether; //$250
    uint256 public maxSupply = 5000;
    uint256 public maxPerUser = 5;
    uint256 public maxReserved = 200; // Zero based index
    string public baseTokenURI;



    /**
     * @dev it will not be ready to start sale upon deploy
     */
    constructor(
        string memory _name,
        string memory _symbol,
        string memory _baseTokenURI,
        address[] memory _payees,
        uint256[] memory _shares
    ) ERC721A(_name, _symbol) PaymentSplitter(_payees, _shares){
        setBaseURI(_baseTokenURI);
        //REMINDER: Delete Later
        console.log("Testing test deploy", _name, _symbol);
    }

    mapping(address => bool) internal _presaleApproved;
    mapping(address => bool) internal _presaleMinted;

    /*----------------------------------------------*/
    /*                  MODIFIERS                  */
    /*--------------------------------------------*/

    modifier verifyMint(uint256 _amountOfTokens) {
        require(balanceOf(msg.sender) + _amountOfTokens <= maxPerUser, "You already have maximum number of tokens allowed per wallet");
        _;
    }

    modifier isEnoughEth(uint256 _amountOfTokens) {
        require(msg.value == _amountOfTokens * price, "Incorrect ETH value");
        _;
    }

    /*----------------------------------------------*/
    /*                  FUNCTIONS                  */
    /*--------------------------------------------*/
    //public minting
    function mint(uint256 _amountOfTokens)
        external
        payable
        nonReentrant
        verifyMint(_amountOfTokens)
        isEnoughEth(_amountOfTokens)
    {
        require(saleIsActive, "Sale is currently not active");
        _safeMint(msg.sender, _amountOfTokens);
    }

    //add wallets to give them access to the presale
    function addToPresale(address[] calldata _wallets) external onlyOwner {        
        for (uint256 i = 0; i < _wallets.length; i++) {
            require(!_presaleApproved[_wallets[i]], "Wallet is already in the presale");
            _presaleApproved[_wallets[i]] = true;
        }
    }

    //presale minting
    function presaleMint(uint256 _amountOfTokens, bytes32[] calldata _merkleProof)
        external
        payable
        nonReentrant
        verifyMint(_amountOfTokens)
        isEnoughEth(_amountOfTokens)
    {
        require(presaleIsActive, "Presale is currently not active");
        require(_presaleApproved[msg.sender], "You are not in the pre-sale");
        require(!_presaleMinted[msg.sender], "You have already minted your tokens for the presale");
        bytes32 leaf = keccak256(abi.encodePacked(_msgSender()));
        require(MerkleProof.verify(_merkleProof, merkleRoot, leaf), 'Invalid proof!');

        _safeMint(msg.sender, _amountOfTokens);
        if (balanceOf(msg.sender) == maxPerUser) {
            _presaleMinted[msg.sender] = true;
        }
    }

    // giftMint function allows the owner to mint maxReserved amount
    function giftMint(uint256 _amountOfTokens) external nonReentrant onlyOwner {
        _safeMint(msg.sender, _amountOfTokens);
    }

    /**************ADMIN BASE FUNCTIONS *************/
    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }

    function setBaseURI(string memory _baseTokenURI) public onlyOwner {
        baseTokenURI = _baseTokenURI;
    }

    function startSale() external onlyOwner {
        saleIsActive = true;
    }

    function pauseSale() external onlyOwner {
        saleIsActive = false;
    }

    function startPresale() external onlyOwner {
        presaleIsActive = true;
    }

    function pausePresale() external onlyOwner {
        presaleIsActive = false;
    }

    function setMerkleRoot(bytes32 _merkleRoot) public onlyOwner {
        merkleRoot = _merkleRoot;
    }

    function withdrawAll() public payable onlyOwner nonReentrant {
        (bool success, ) = payable(msg.sender).call{value: address(this).balance}('');
        require(success);
    }

    // // Allows us to recover ERC20 tokens sent to contract
    function withdrawTokens(IERC20 token) public onlyOwner {
        uint256 balance = token.balanceOf(address(this));
        token.transfer(msg.sender, balance);
    }
}
