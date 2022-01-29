// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// @title: Surge Women NFT Collection
// @website : https://www.surgewomen.io/

// █▀ █░█ █▀█ █▀▀ █▀▀   █░█░█ █▀█ █▀▄▀█ █▀▀ █▄░█
// ▄█ █▄█ █▀▄ █▄█ ██▄   ▀▄▀▄▀ █▄█ █░▀░█ ██▄ █░▀█
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/finance/PaymentSplitter.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Surge is ERC721, ReentrancyGuard, Ownable, ERC721Enumerable, IERC2981,
    PaymentSplitter {
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
    bool public presaleIsActive;

    uint16 public constant MAX_TOKENS = 2500;
    uint256 public constant TOKEN_PRICE = 50000000000000000; //0.05ETH

    string public baseTokenURI;
    struct Royalty {
        address recipient;
        uint256 salePrice;
    }

    mapping(uint256 => Royalty) internal _royalties;
    mapping(address => bool) internal _presaleApproved;
    mapping(address => bool) internal _presaleMinted;

        /**
     * @dev it will not be ready to start sale upon deploy
     */
    constructor(string memory _name, string memory _symbol, string memory _baseURI, address[] memory _payees, uint256[] memory _shares
    ) ERC721(_name, _symbol) PaymentSplitter(_payees, _shares) payable {
        setBaseURI(_baseURI);
        console.log("Testing test deploy", _name, _symbol);
    }

    /*----------------------------------------------*/
    /*                  MODIFIERS                  */
    /*--------------------------------------------*/
    modifier isSaleActive() {
        require(saleIsActive, "Sale is currently not active");
        _;
    }

    modifier isPresaleActive() {
        require(presaleIsActive, "Presale is currently not active");
        _;
    }

    modifier maxMint(uint256 _amountOfTokens) {
        require(
            balanceOf(msg.sender) + _amountOfTokens <= MAX_PER_USER,
            "You already have maximum number of tokens allowed per wallet"
        );
        _;
    }

    modifier isEnoughEth(uint256 _amountOfTokens) {
        require(_amountOfTokens * TOKEN_PRICE == msg.value, "Incorrect ETH value");
        _;
    }

    modifier isInPresale() {
        require(_presaleApproved[msg.sender], "You are not in the pre-sale");
        _;
    }

    modifier hasMintedMaxPresale() {
        require(!_presaleMinted[msg.sender], "You have already minted your tokens for the presale");
        _;
    }

    /*----------------------------------------------*/
    /*                  FUNCTIONS                  */
    /*--------------------------------------------*/
    //Sets salePrice at time of blockstamp, if marketplace takes longer to return royalties they will be different
    //and must be taken up with the marketplace
    function _setTokenRoyalty(uint256 tokenId, address recipient, uint256 salePrice) internal {
        //This is so expected 'value' will be at most 10,000 which is 100%
        require(salePrice <= 10000, "ERC2981Royalities: Too high");
        _royalties[tokenId] = Royalty(recipient, salePrice);
    }

    /**
     * @dev Called with the sale price to determine how much royalty is owed and to whom.
     * @param tokenId - the NFT asset queried for royalty information
     * @param salePrice - the sale price of the NFT asset specified by `tokenId`
     * @return receiver - address of who should be sent the royalty payment
     * @return royaltyAmount - the royalty payment amount for `salePrice`
     */
        function royaltyInfo(uint256 tokenId, uint256 salePrice)
        external
        view
        override
        returns (address receiver, uint256 royaltyAmount)
    {
        require(_exists(tokenId), "Nonexistent token");

        if(_royalties[tokenId].recipient != address(0)) {
            return (_royalties[tokenId].recipient, salePrice * _royalties[tokenId].salePrice / 10000);
        }
        Royalty memory royalty = _royalties[tokenId];
        if(royalty.recipient != address(0) && royalty.salePrice != 0) {
            return (royalty.recipient, (salePrice * royalty.salePrice) / 10000);
        }
        return (address(0), 0);
    } 
    //public minting
    function mint(uint256 _amountOfTokens)
        external
        payable
        nonReentrant
        isSaleActive
        maxMint(_amountOfTokens)
        isEnoughEth(_amountOfTokens)
    {
        for (uint256 i = 0; i < _amountOfTokens; i++) {
            uint256 newTokenId = _tokenIds.current() + 1;
            require(newTokenId <= MAX_TOKENS, "No available tokens to mint");            
            _safeMint(msg.sender, newTokenId);
            _tokenIds.increment();
        }
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
        isPresaleActive
        maxMint(_amountOfTokens)
        isEnoughEth(_amountOfTokens)
        isInPresale
        hasMintedMaxPresale
    {
        for (uint256 i = 0; i < _amountOfTokens; i++) {
            uint256 newTokenId = _tokenIds.current() + 1;
            require(newTokenId <= MAX_TOKENS, "No available tokens to mint");
            _safeMint(msg.sender, newTokenId);
            _tokenIds.increment();
        }
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

    //getter for tokens owned by a user
    function getTokens(address _owner) external view returns (uint256[] memory) {
        uint256 totalCount = balanceOf(_owner);
        uint256[] memory tokenIds = new uint256[](totalCount);

        for (uint256 i = 0; i < totalCount; i++) {
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

    function supportsInterface(bytes4 _interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(_interfaceId);
    }

    /**************ADMIN BASE FUNCTIONS *************/
    function _baseURI() internal view override(ERC721) returns (string memory) {
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

    function withdrawAll() public payable onlyOwner {
        require(payable(msg.sender).send(address(this).balance));
    }
}
