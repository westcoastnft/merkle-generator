const generateButton = document.getElementById("generate");
const addressesInput = document.getElementById("leaves");
const result = document.getElementById("proof");
const verifyButton = document.getElementById("verify");
const proofAddress = document.getElementById("address");
const generatedProof = document.getElementById("generatedProof");
const proofResult = document.getElementById("result");
let tree;
let root;
generateButton.onclick = () => {
  let addresses = addressesInput.value;
  let arr = addresses.split('\n');
  let leaves = arr.map((v) => keccak256(v));
  tree = new MerkleTree(leaves, keccak256, { sort: true });
  root = tree.getHexRoot();
  result.innerText = root;
}

verifyButton.onclick = () => {
  let address = proofAddress.value;
  let leaf = keccak256(address);
  const proof = tree.getProof(leaf);
  const hexProof = tree.getHexProof(leaf);
  generatedProof.innerText = hexProof;
  proofResult.innerText = tree.verify(proof, leaf, root);  
}