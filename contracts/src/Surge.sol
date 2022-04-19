// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// @title: Surge Women NFT Collection
// @website : https://www.surgewomen.io/

// █▀ █░█ █▀█ █▀▀ █▀▀   █░█░█ █▀█ █▀▄▀█ █▀▀ █▄░█
// ▄█ █▄█ █▀▄ █▄█ ██▄   ▀▄▀▄▀ █▄█ █░▀░█ ██▄ █░▀█
import "hardhat/console.sol";
import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/finance/PaymentSplitter.sol";

contract Surge is ERC721A, ReentrancyGuard, Ownable, PaymentSplitter {
    using Strings for uint256;

    // Status of the token & token sale
    enum SaleStatus {
        Paused,
        Presale,
        PublicSale,
        SoldOut
    }
    
    SaleStatus public status = SaleStatus.Paused;
    bytes32 public merkleRoot;
    string public baseTokenURI;

    uint64 public constant MAX_SUPPLY = 5000;
    uint64 public constant MAX_PER_USER = 5;
    uint128 public price;

    /**
     * @dev it will not be ready to start sale upon deploy
     */
    constructor(
        string memory _name,
        string memory _symbol,
        string memory _baseTokenURI,
        uint128 _price,
        address[] memory _payees,
        uint256[] memory _shares
    ) ERC721A(_name, _symbol) PaymentSplitter(_payees, _shares){
        setBaseURI(_baseTokenURI);
        setPrice(_price);
    }

    mapping(address => bool) internal _presaleMinted;
    mapping(address => uint) internal _mintedAmount;

    /*----------------------------------------------*/
    /*                  MODIFIERS                  */
    /*--------------------------------------------*/

    modifier verifyMaxPerUser(uint256 _amountOfTokens) {
        require(_mintedAmount[msg.sender] + _amountOfTokens <= MAX_PER_USER, "Already have Max");
        _;
    }

    modifier verifyMaxPerUserByAddress(address to) {
        require(_mintedAmount[to] + 1 <= MAX_PER_USER && balanceOf(to) + 1 <= MAX_PER_USER, "Already have Max");
        _;
    }

    modifier verifyMaxSupply(uint256 _amountOfTokens) {
        require(_amountOfTokens + _totalMinted() <= MAX_SUPPLY, "Max minted tokens");
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
        verifyMaxPerUser(_amountOfTokens)
        verifyMaxSupply(_amountOfTokens)
        isEnoughEth(_amountOfTokens)
    {
        require(status == SaleStatus.PublicSale, "Sale is not active");
        _safeMint(msg.sender, _amountOfTokens);
    }

    //presale minting
    function presaleMint(uint256 _amountOfTokens, bytes32[] calldata _merkleProof)
        external
        payable
        verifyMaxPerUser(_amountOfTokens)
        verifyMaxSupply(_amountOfTokens)
        isEnoughEth(_amountOfTokens)
    {
        require(status == SaleStatus.Presale, "Presale is not active");

        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        require(MerkleProof.verify(_merkleProof, merkleRoot, leaf), "Invalid proof!");
        require(!_presaleMinted[msg.sender], "You have already minted your tokens for the presale");

        _mintedAmount[msg.sender] = _amountOfTokens;
        _presaleMinted[msg.sender] = true;
        _safeMint(msg.sender, _amountOfTokens);
    }

    // batchMinting function allows the owner to mint maxReserved amount
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

    // Ensures that the address can only have a max of 5 tokens in their wallet after mint
    function transferFrom(address from, address to, uint256 tokenId) 
    public    
    override
    verifyMaxPerUserByAddress(to)
    {
        super.transferFrom(from, to, tokenId);
    }

    // Ensures that the address can only have a max of 5 tokens in their wallet after mint
    function safeTransferFrom(address from, address to, uint256 tokenId) 
    public    
    override
    verifyMaxPerUserByAddress(to)
    {
        super.safeTransferFrom(from, to, tokenId);
    }
   
    /**************ADMIN BASE FUNCTIONS *************/
    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }

    function setBaseURI(string memory _baseTokenURI) public onlyOwner {
        baseTokenURI = _baseTokenURI;
    }

    function setStatus(SaleStatus _status) public onlyOwner {
        status = _status;
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

    // // Allows us to recover ERC20 tokens sent to contract
    function withdrawTokens(IERC20 token) public onlyOwner {
        uint256 balance = token.balanceOf(address(this));
        token.transfer(msg.sender, balance);
    }
}
