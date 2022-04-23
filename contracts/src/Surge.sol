// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

// @title: Surge Women NFT Collection
// @website : https://www.surgewomen.io/

// █▀ █░█ █▀█ █▀▀ █▀▀   █░█░█ █▀█ █▀▄▀█ █▀▀ █▄░█
// ▄█ █▄█ █▀▄ █▄█ ██▄   ▀▄▀▄▀ █▄█ █░▀░█ ██▄ █░▀█
import "hardhat/console.sol";
import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./ERC2981ContractWideRoyalties.sol";

contract Surge is ERC721A, ReentrancyGuard, Ownable, ERC2981ContractWideRoyalties {
    using Strings for uint256;

    // Status of the token & token sale
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
     * @dev it will not be ready to start sale upon deploy
     */
    constructor(
        string memory _name,
        string memory _symbol,
        string memory _baseTokenURI,
        uint128 _price,
        address _receiver,
        uint256 _royalties
    ) payable ERC721A(_name, _symbol) {
        setBaseURI(_baseTokenURI);
        setPrice(_price);
        setRoyalties(_receiver, _royalties);
    }

    mapping(address => uint) private _mintedAmount;

    /*----------------------------------------------*/
    /*                  MODIFIERS                  */
    /*--------------------------------------------*/

    /// @notice Verifies the amount of tokens the address has minted does not exceed MAX_PER_USER
    /// @param to Address to check the amount of tokens minted
    /// @param _amountOfTokens Number of tokens to be minted
    modifier verifyMaxPerUser(address to, uint256 _amountOfTokens) {
        require(_mintedAmount[to] + _amountOfTokens <= MAX_PER_USER, "Already have Max");
        _;
    }

    /// @notice Verifies total number of minted tokens does not exceed MAX_SUPPLY
    /// @param _amountOfTokens Number of tokens to be minted
    modifier verifyMaxSupply(uint256 _amountOfTokens) {
        require(_amountOfTokens + _totalMinted() <= MAX_SUPPLY, "Max minted tokens");
        _;
    }

    /// @notice Verifies the address minting has enough ETH in their wallet to mint
    /// @param _amountOfTokens Number of tokens to be minted
    modifier isEnoughEth(uint256 _amountOfTokens) {
        require(msg.value == _amountOfTokens * price, "Incorrect ETH value");
        _;
    }

    /*----------------------------------------------*/
    /*               MINT FUNCTIONS                */
    /*--------------------------------------------*/

    /// @notice Public sale minting
    /// @param to Address that will recieve minted token
    /// @param _amountOfTokens Number of tokens to mint
    function mint(address to, uint256 _amountOfTokens)
        external
        payable
        verifyMaxPerUser(to, _amountOfTokens)
        verifyMaxSupply(_amountOfTokens)
        isEnoughEth(_amountOfTokens)
    {
        require(status == SaleStatus.PublicSale, "Sale is not active");

        _mintedAmount[to] += _amountOfTokens;
        _safeMint(to, _amountOfTokens);
    }

    /// @notice Presale minting verifies callers address is in Merkle Root
    /// @param _amountOfTokens Number of tokens to mint
    /// @param _merkleProof Hash of the callers address used to verify the location of that address in the Merkle Root
    function presaleMint(uint256 _amountOfTokens, bytes32[] calldata _merkleProof)
        external
        payable
        verifyMaxPerUser(msg.sender, _amountOfTokens)
        verifyMaxSupply(_amountOfTokens)
        isEnoughEth(_amountOfTokens)
    {
        require(status == SaleStatus.Presale, "Presale is not active");

        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        require(MerkleProof.verify(_merkleProof, merkleRoot, leaf), "Invalid proof!");

        _mintedAmount[msg.sender] += _amountOfTokens;
        _safeMint(msg.sender, _amountOfTokens);
    }

    /// @notice Allows the owner to mint for the organizations treasury
    /// @param _amountOfTokens Number of tokens to mint
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
    /*             ROYALTIES FUNCTION              */
    /*--------------------------------------------*/

    /// @notice Allows to set the royalties on the contract
    /// @param value Updated royalties (between 0 and 10000)
    function setRoyalties(address recipient, uint256 value) public onlyOwner {
        _setRoyalties(recipient, value);
    }

    /*----------------------------------------------*/
    /*           ADMIN BASE FUNCTIONS              */
    /*--------------------------------------------*/

    /// @inheritdoc	ERC165
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721A, ERC2981Base) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    /// @notice Get the baseURI
    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }

    /// @notice Set metadata base URI
    /// @param _baseTokenURI New base URI
    function setBaseURI(string memory _baseTokenURI) public onlyOwner {
        baseTokenURI = _baseTokenURI;
    }

    /// @notice Set the current status of the sale
    /// @param _status Enum value of SaleStatus
    function setStatus(SaleStatus _status) public onlyOwner {
        status = _status;
        emit StatusUpdate(_status);
    }
    /// @notice Set mint price
    /// @param _price Mint price in Wei
    function setPrice(uint128 _price) public onlyOwner {
        price = _price;
    }

    /// @notice Set Presale Merkle Root
    /// @param _merkleRoot Merkle Root hash
    function setMerkleRoot(bytes32 _merkleRoot) public onlyOwner {
        merkleRoot = _merkleRoot;
    }

    /// @notice Release contract funds to contract owner
    function withdrawAll() public payable onlyOwner nonReentrant {
        (bool success, ) = payable(msg.sender).call{value: address(this).balance}("");
        require(success, "Unsuccessful withdraw");
    }

    /// @notice Release any ERC20 tokens to the contract
    /// @param token ERC20 token sent to contract
    function withdrawTokens(IERC20 token) public onlyOwner {
        uint256 balance = token.balanceOf(address(this));
        SafeERC20.safeTransfer(token, msg.sender, balance);
    }
}
