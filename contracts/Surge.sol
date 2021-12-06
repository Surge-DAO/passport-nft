// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// @title: Surge Women NFT Collection
// @website : https://www.surgewomen.io/


// █▀ █░█ █▀█ █▀▀ █▀▀   █░█░█ █▀█ █▀▄▀█ █▀▀ █▄░█
// ▄█ █▄█ █▀▄ █▄█ ██▄   ▀▄▀▄▀ █▄█ █░▀░█ ██▄ █░▀█
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract Surge is ERC721{
    /************* STATE *************/
    //to keep track of tokenIDs
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint256 public constant MAX_PER_USER = 3;

    constructor() ERC721("Surge Women", "SURGE") {
        console.log("Testing test deploy");
    }
}