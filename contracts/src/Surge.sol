// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// @title: Surge Women NFT Collection
// @website: https://www.surgewomen.io/

// █▀ █░█ █▀█ █▀▀ █▀▀   █░█░█ █▀█ █▀▄▀█ █▀▀ █▄░█
// ▄█ █▄█ █▀▄ █▄█ ██▄   ▀▄▀▄▀ █▄█ █░▀░█ ██▄ █░▀█

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/finance/PaymentSplitter.sol";

contract Surge is ERC721A, ReentrancyGuard, Ownable, PaymentSplitter {
    using Strings for uint256;

    // Status of the token sale
    enum SaleStatus {
        Paused,
        Presale,
        PublicSale,
        SoldOut
    }

    event StatusUpdate(SaleStatus _status);

    SaleStatus public status = SaleStatus.Paused;
    bytes32 public merkleRoot;
    string public baseTokenURI;

    uint64 public constant MAX_SUPPLY = 5000;
    uint64 public constant MAX_PER_USER = 5;
    uint128 public price;

    /**
     * @dev Sale is paused by default upon deploy
     */
    constructor(
        string memory _name,
        string memory _symbol,
        string memory _baseTokenURI,
        uint128 _price,
        address[] memory _payees,
        uint256[] memory _shares
    ) ERC721A(_name, _symbol) PaymentSplitter(_payees, _shares) {
        setBaseURI(_baseTokenURI);
        setPrice(_price);
    }

    mapping(address => uint) private _mintedAmount;

    /*----------------------------------------------*/
    /*                  MODIFIERS                  */
    /*--------------------------------------------*/

    modifier verifyMaxPerUser(address to, uint256 _amountOfTokens) {
        require(_mintedAmount[to] + _amountOfTokens <= MAX_PER_USER, "Max amount minted");
        _;
    }

    modifier verifyMaxSupply(uint256 _amountOfTokens) {
        require(_amountOfTokens + _totalMinted() <= MAX_SUPPLY, "Collection sold out");
        _;
    }

    modifier isEnoughEth(uint256 _amountOfTokens) {
        require(msg.value == _amountOfTokens * price, "Not enough ETH");
        _;
    }

    /*----------------------------------------------*/
    /*                  FUNCTIONS                  */
    /*--------------------------------------------*/

    // Public minting
    function mint(address to, uint256 _amountOfTokens)
        external
        payable
        verifyMaxPerUser(to, _amountOfTokens)
        verifyMaxSupply(_amountOfTokens)
        isEnoughEth(_amountOfTokens)
    {
        require(status == SaleStatus.PublicSale, "Sale not active");

        _mintedAmount[to] += _amountOfTokens;
        _safeMint(to, _amountOfTokens);
    }

    // Presale minting
    function presaleMint(uint256 _amountOfTokens, bytes32[] calldata _merkleProof)
        external
        payable
        verifyMaxPerUser(msg.sender, _amountOfTokens)
        verifyMaxSupply(_amountOfTokens)
        isEnoughEth(_amountOfTokens)
    {
        require(status == SaleStatus.Presale, "Presale not active");

        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        require(MerkleProof.verify(_merkleProof, merkleRoot, leaf), "Not in presale list");

        _mintedAmount[msg.sender] += _amountOfTokens;
        _safeMint(msg.sender, _amountOfTokens);
    }

    // Batch minting allows the owner to mint for project's treasury
    function batchMinting(uint256 _amountOfTokens)
        external
        payable
        nonReentrant
        onlyOwner
        verifyMaxSupply(_amountOfTokens)
        isEnoughEth(_amountOfTokens)
    {
        _safeMint(msg.sender, _amountOfTokens);
    }

    /*----------------------------------------------*/
    /*            ADMIN BASE FUNCTIONS             */
    /*--------------------------------------------*/

    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }

    function setBaseURI(string memory _baseTokenURI) public onlyOwner {
        baseTokenURI = _baseTokenURI;
    }

    function setStatus(SaleStatus _status) public onlyOwner {
        status = _status;
        emit StatusUpdate(_status);
    }

    function setMerkleRoot(bytes32 _merkleRoot) public onlyOwner {
        merkleRoot = _merkleRoot;
    }

    function setPrice(uint128 _price) public onlyOwner {
        price = _price;
    }

    function withdrawAll() public payable onlyOwner nonReentrant {
        (bool success, ) = payable(msg.sender).call{value: address(this).balance}("");
        require(success);
    }

    // Allows us to recover any ERC20 tokens sent to the contract
    function withdrawTokens(IERC20 token) public onlyOwner {
        uint256 balance = token.balanceOf(address(this));
        token.transfer(msg.sender, balance);
    }
}
