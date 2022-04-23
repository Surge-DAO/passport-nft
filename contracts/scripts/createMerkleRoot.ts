const hre = require('hardhat');
import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';

// Enter your testing addresses here
const whitelistAddresses =
  [
    "0x5c6B0f7Bf3E7ce046039Bd8FABdfD3f9F5021678",
    "0x14723A09ACff6D2A60DcdF7aA4AFf308FDDC160C",
    "0x03C6FcED478cBbC9a4FAB34eF9f40767739D1Ff7",
    "0x4B0897b0513fdC7C541B6d9D7E929C4e5364D2dB"
  ];

// Set this to the address you will be calling the presaleMint function with
const msgSender = "0x03C6FcED478cBbC9a4FAB34eF9f40767739D1Ff7";

async function main() {

  // Build the Merkle Tree
  const leafNodes = whitelistAddresses.map(addr => keccak256(addr));
  const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
  const rootHash = '0x' + merkleTree.getRoot().toString('hex');

  // How to get the proof in the front end
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
  