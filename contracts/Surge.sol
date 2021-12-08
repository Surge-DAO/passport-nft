// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// @title: Surge Women NFT Collection
// @website : https://www.surgewomen.io/

// █▀ █░█ █▀█ █▀▀ █▀▀   █░█░█ █▀█ █▀▄▀█ █▀▀ █▄░█
// ▄█ █▄█ █▀▄ █▄█ ██▄   ▀▄▀▄▀ █▄█ █░▀░█ ██▄ █░▀█
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Context.sol";

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Surge is ERC721, ReentrancyGuard, Ownable {
    using Counters for Counters.Counter;
    using Address for address;
    using Strings for uint256;

    /*----------------------------------------------*/
    /*                    STATE                    */
    /*--------------------------------------------*/
    Counters.Counter private _tokenIds;

    uint256 public constant TOKEN_PRICE = 50000000000000000; //0.05ETH
    uint256 public constant MAX_PER_USER = 8;
    uint256 public constant MAX_TOKENS = 10000;
    uint256 public constant MAX_RESERVED_TOKENS = 200;
    string public baseTokenURI;

    uint256 public totalGiftMints = 0;

    bool public saleIsActive = false;
    string private baseURI;

    /*----------------------------------------------*/
    /*                  MODIFIERS                  */
    /*--------------------------------------------*/
    modifier isSaleActive {
        require(saleIsActive, "Sale is currently not active");
        _;
    }

    modifier maxMint(uint256 amountOfTokens){
        require(
            balanceOf(msg.sender) + amountOfTokens <= MAX_PER_USER,
            "You can only mint 8 per wallet"
        );
        _;
    }

    modifier isEnoughEth(uint256 amountOfTokens) {
        require(amountOfTokens * TOKEN_PRICE == msg.value, 
        "Incorrect ETH value");
        _;
    }

 
    /**
     * @dev it will not be ready to start sale upon deploy
     */
    constructor(string memory name, string memory symbol, string memory baseURI) ERC721(name, symbol) {
        setBaseURI(baseURI);
        console.log("Testing test deploy", name, symbol);
    }


    /*----------------------------------------------*/
    /*                  FUNCTIONS                  */
    /*--------------------------------------------*/
    //public minting
    function mint(uint256 amountOfTokens) 
        external 
        payable
        nonReentrant 
        isSaleActive
        maxMint(amountOfTokens) 
        isEnoughEth(amountOfTokens) {
        for(uint i=0; i< amountOfTokens; i++) {
            uint256 newTokenId = _tokenIds.current() + 1;
            require(newTokenId <= MAX_TOKENS, "No more available tokens to mint");
            _safeMint(msg.sender, newTokenId);
            _tokenIds.increment();
        }
    }

    //gift minting
    function giftMint(address [] calldata receivers) external nonReentrant onlyOwner {
        uint totalReceivers = receivers.length;
        for(uint i=0; i < totalReceivers; i++) {
    
            //checks if there is enough reserved token for gifting left
            require(totalGiftMints <= MAX_RESERVED_TOKENS, "No more tokens for gifting");
            totalGiftMints++;
            uint256 newTokenId = _tokenIds.current() + 1;
            _safeMint(receivers[i], newTokenId);
            _tokenIds.increment();
            }
        }

 /**************ADMIN BASE FUNCTIONS *************/ 
    function _baseURI() internal view override(ERC721) returns(string memory) {
        return baseURI;
    }

    function setBaseURI(string memory _URI) public onlyOwner {
        baseURI = _URI;
    }

    function startSale() external onlyOwner {
        saleIsActive = true;
    }

    function pauseSale() external onlyOwner {
        saleIsActive = false;
    }
   
}
