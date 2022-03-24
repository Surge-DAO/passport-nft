// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// @title: Surge Women NFT Collection
// @website : https://www.surgewomen.io/

// █▀ █░█ █▀█ █▀▀ █▀▀   █░█░█ █▀█ █▀▄▀█ █▀▀ █▄░█
// ▄█ █▄█ █▀▄ █▄█ ██▄   ▀▄▀▄▀ █▄█ █░▀░█ ██▄ █░▀█
import "hardhat/console.sol";
import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import '@openzeppelin/contracts/utils/cryptography/MerkleProof.sol';
import "@openzeppelin/contracts/access/Ownable.sol";

contract Surge is ERC721A, ReentrancyGuard, Ownable {
    using Counters for Counters.Counter;
    using Address for address;
    using SafeMath for uint256;
    using Strings for uint256;

    /*----------------------------------------------*/
    /*                    STATE                    */
    /*--------------------------------------------*/
    Counters.Counter private _tokenIds;

    uint8 public constant MAX_PER_USER = 5;
    uint8 public constant MAX_RESERVED_TOKENS = 199; //Zero based Index
    uint8 public totalGiftMints = 0;
    bool public saleIsActive;
    bool public presaleIsActive;

    uint16 public constant MAX_TOKENS = 5000;
    uint256 public constant TOKEN_PRICE = 80000000000000000; //0.08ETH

    string public baseTokenURI;

    mapping(address => bool) internal _presaleApproved;
    mapping(address => bool) internal _presaleMinted;

    /**
     * @dev it will not be ready to start sale upon deploy
     */
    constructor(
        string memory _name,
        string memory _symbol,
        string memory _baseTokenURI
    ) ERC721A(_name, _symbol) {
        setBaseURI(_baseTokenURI);
        //REMINDER: Delete Later
        console.log("Testing test deploy", _name, _symbol);
    }

    /*----------------------------------------------*/
    /*                  MODIFIERS                  */
    /*--------------------------------------------*/

    modifier verifyMint(uint256 _amountOfTokens) {
        require(balanceOf(msg.sender) + _amountOfTokens <= MAX_PER_USER, "You already have maximum number of tokens allowed per wallet");
        require(!_presaleMinted[msg.sender], "You have already minted your tokens for the presale");
        _;
    }

    modifier isEnoughEth(uint256 _amountOfTokens) {
        require(msg.value >= _amountOfTokens * TOKEN_PRICE, "Incorrect ETH value");
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

    //add a wallet to give them access to the presale
    function addToPresale(address _wallet) external onlyOwner {
        require(!_presaleApproved[_wallet], "Wallet is already in the presale");
        _presaleApproved[_wallet] = true;
    }

    //presale minting
    function presaleMint(uint256 _amountOfTokens)
        external
        payable
        nonReentrant
        verifyMint(_amountOfTokens)
        isEnoughEth(_amountOfTokens)
    {
        require(presaleIsActive, "Presale is currently not active");
        require(_presaleApproved[msg.sender], "You are not in the pre-sale");
        _safeMint(msg.sender, _amountOfTokens);
        if (balanceOf(msg.sender) == MAX_PER_USER) {
            _presaleMinted[msg.sender] = true;
        }
    }

    //gift minting
    function giftMint(address[] calldata _receivers) external nonReentrant onlyOwner {
        uint256 totalReceivers = _receivers.length;
        for (uint256 i = 0; i < totalReceivers; i++) {
            //checks if there is enough reserved token for gifting left
            require(totalGiftMints <= MAX_RESERVED_TOKENS, "No available tokens for gifting");
            require(balanceOf(_receivers[i]) + 1 <= MAX_PER_USER, "Wallet has max number of tokens allowed");
            totalGiftMints++;
            uint256 newTokenId = _tokenIds.current() + 1;
            _safeMint(_receivers[i], newTokenId);
            _tokenIds.increment();
        }
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

    function getTokensMinted() public view returns (uint256) {
        return _tokenIds.current() + 1;
    }

    function withdrawAll() public payable onlyOwner nonReentrant {
        require(payable(msg.sender).send(address(this).balance));
    }
}
