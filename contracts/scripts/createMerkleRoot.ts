const hre = require('hardhat');
import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';

// Enter your testing addresses here
const whitelistAddresses = 
[
    "0xCdDB9663B53A9Fbe53f838339e8909441C0cd353",
    "0x4Ea3674531C8Cf80C29fD590F1cd508d4CF8E2E9"
];

// Enter your testing contract address here to get the proof to pass in for presaleMint function
const msgSender = "0xCdDB9663B53A9Fbe53f838339e8909441C0cd353";

async function main() {
    
  // Build the Merkle Tree
  const leafNodes = whitelistAddresses.map(addr => keccak256(addr));
  const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
  const rootHash = '0x' + merkleTree.getRoot().toString('hex');

  // how to get the proof in the front end
  var leaf = keccak256(msgSender);
  const proof = merkleTree.getProof(leaf);

  console.log(rootHash);
  console.log(proof);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });