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

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Surge is ERC721 {
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


    /*----------------------------------------------*/
    /*                  MODIFIERS                  */
    /*--------------------------------------------*/
    modifier isSaleActive() {
        require(saleIsActive, "Sale is currently not active");
        _;
    }

    modifier isEnoughEth(uint256 numOfTokens) {
        require(numOfTokens * TOKEN_PRICE == msg.value, 
        "Incorrect ETH value");
        _;
    }

    constructor() ERC721("Surge Women", "SURGE") {
        console.log("Testing test deploy");
    }


    /*----------------------------------------------*/
    /*                  FUNCTIONS                  */
    /*--------------------------------------------*/
    //public minting
    function mint(uint256 numOfTokens) 
        external 
        payable 
        nonReentrant 
        isSaleActive()
        isEnoughEth(numOfTokens) {
        /* TO DO: 
          implement : 
            - check if public sale has started
            - check that there is tokens to mint left
            - check that user does not have more than 8 tokens
            ✓ check that they have enough money
        */
        for(uint i=0; i< numOfTokens; i++) {
            uint256 newTokenId = _tokenIds.current() + 1;
            _safeMint(msg.sender, newTokenId);
            _tokenIds.increment();
        }
    }

    //gift minting
    function giftMint(uint256 numOfTokens) public onlyOwner {
        //checks if there is enough reserved token for giftin left
        require(_tokenIds.current() + 1 + numOfTokens <= MAX_RESERVED_TOKEN);
        for(uint i=0; i< numOfTokens; i++) {
            totalGiftMints++;
            uint256 newTokenId = _tokenIds.current() + 1;
            _safeMint(msg.sender, newTokenId);
            _tokenIds.increment();
            }
        }
}
