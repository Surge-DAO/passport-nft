const hre = require('hardhat');
import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';

// Enter your testing addresses here
const whitelistAddresses = 
[
  "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
  "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
  "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"
];


// Set this to remember which address is the owner
const owner = "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4";

// Set this to the address you will be calling the presaleMint function with
const msgSender = "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2";

async function main() {
    
  // Build the Merkle Tree
  const leafNodes = whitelistAddresses.map(addr => keccak256(addr));
  const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
  const rootHash = '0x' + merkleTree.getRoot().toString('hex');

  // how to get the proof in the front end
  var leaf = keccak256(msgSender);
  const proof = merkleTree.getHexProof(leaf);

  console.log(rootHash);
  console.log(proof);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });