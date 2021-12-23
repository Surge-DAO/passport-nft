// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// @title: Surge Women NFT Collection
// @website : https://www.surgewomen.io/

// █▀ █░█ █▀█ █▀▀ █▀▀   █░█░█ █▀█ █▀▄▀█ █▀▀ █▄░█
// ▄█ █▄█ █▀▄ █▄█ ██▄   ▀▄▀▄▀ █▄█ █░▀░█ ██▄ █░▀█
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Surge is ERC721, ReentrancyGuard, Ownable, ERC721Enumerable {
    using Counters for Counters.Counter;
    using Address for address;
    using SafeMath for uint256;
    using Strings for uint256;

    /*----------------------------------------------*/
    /*                    STATE                    */
    /*--------------------------------------------*/
    Counters.Counter private _tokenIds;

    uint8 public constant MAX_PER_USER = 5;
    uint8 public constant MAX_RESERVED_TOKENS = 120;
    uint8 public totalGiftMints = 0;
    bool public saleIsActive;

    uint16 public constant MAX_TOKENS = 2500;
    uint256 public constant TOKEN_PRICE = 50000000000000000; //0.05ETH
    
    string private baseTokenURI;

    /*----------------------------------------------*/
    /*                  MODIFIERS                  */
    /*--------------------------------------------*/
    modifier isSaleActive {
        require(saleIsActive, "Sale is currently not active");
        _;
    }

    modifier maxMint(uint256 _amountOfTokens){
        require(
            balanceOf(msg.sender) + _amountOfTokens <= MAX_PER_USER,
             "You have the maximum number of tokens allowed per wallet"
        );
        _;
    }

    modifier isEnoughEth(uint256 _amountOfTokens) {
        require(_amountOfTokens * TOKEN_PRICE == msg.value, 
        "Incorrect ETH value");
        _;
    }
 
    /**
     * @dev it will not be ready to start sale upon deploy
     */
    constructor(string memory _name, string memory _symbol, string memory _baseURI) ERC721(_name, _symbol) {
        setBaseURI(_baseURI);
        console.log("Testing test deploy", _name, _symbol);
    }


    /*----------------------------------------------*/
    /*                  FUNCTIONS                  */
    /*--------------------------------------------*/
    //public minting
    function mint(uint256 _amountOfTokens) 
        external 
        payable
        nonReentrant 
        isSaleActive
        maxMint(_amountOfTokens) 
        isEnoughEth(_amountOfTokens) {
        for(uint i=0; i < _amountOfTokens; i++) {
            uint256 newTokenId = _tokenIds.current() + 1;
            require(newTokenId <= MAX_TOKENS, "No more available tokens to mint");
            _safeMint(msg.sender, newTokenId);
            _tokenIds.increment();
        }
    }

    //gift minting
    function giftMint(address [] calldata _receivers) external nonReentrant onlyOwner {
        uint totalReceivers = _receivers.length;
        for(uint i=0; i < totalReceivers; i++) {
            //checks if there is enough reserved token for gifting left
            require(totalGiftMints <= MAX_RESERVED_TOKENS, "No more tokens for gifting");
            require(balanceOf(_receivers[i]) + 1 <= MAX_PER_USER, "Wallet has Max number of tokens allowed");
            totalGiftMints++;
            uint256 newTokenId = _tokenIds.current() + 1;
            _safeMint(_receivers[i], newTokenId);
            _tokenIds.increment();
            }
        }


    //getter for tokens owned by a user
    function getTokens(address _owner) external view returns (uint256[] memory) {
        uint256 totalCount = balanceOf(_owner);
        uint256[] memory tokenIds = new uint256[](totalCount);

        for(uint i=0; i < totalCount; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
        }

        return tokenIds;
   }

   //ERC721 Enumerable
     function _beforeTokenTransfer(
        address _from,
        address _to,
        uint256 _tokenId
    ) internal virtual override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(_from, _to, _tokenId);
    }

    function supportsInterface(bytes4 _interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(_interfaceId);
    }


 /**************ADMIN BASE FUNCTIONS *************/ 
    function _setBaseURI(string memory baseURI) internal virtual {
        baseTokenURI = baseURI;
    }

    function setBaseURI(string memory _baseURI) public onlyOwner {
        _setBaseURI(_baseURI);
    }

    function startSale() external onlyOwner {
        saleIsActive = true;
    }

    function pauseSale() external onlyOwner {
        saleIsActive = false;
    }

    function getTokensMinted() public view returns(uint256) {
        return _tokenIds.current() + 1;
    }

   function withdrawAll() public payable onlyOwner {
    require(payable(msg.sender).send(address(this).balance));
  }

}
