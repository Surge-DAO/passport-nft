//SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20TestToken is ERC20{

    constructor() ERC20("Test Token", "TST") {
        _mint(msg.sender, 10000000000000);
    }
}
