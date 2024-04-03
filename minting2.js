const { ethers } = require("ethers");

const contractAddress = "0x133878C0A3c07FD77A5803d16D7BF6159480fddc";
const contractABI = require("./seaDrop2.json");
const providerUrl = "https://sepolia.mode.network";

const provider = new ethers.providers.JsonRpcProvider(providerUrl);
const privateKey =
  "22f3135a704341aa2f50c87d73fb484d8cf8bccc2e85519aac2300756e975ebb"; 
const wallet = new ethers.Wallet(privateKey, provider);

const contract = new ethers.Contract(contractAddress, contractABI, wallet);

console.log(wallet.address);

const nftContract = "0x72b745f2d4E3DD2cA68987E8D17B812a15Ef94A2"; 
const feeRecipient = wallet.address;
const minterIfNotPayer = "0x0000000000000000000000000000000000000000";
const quantity = 1;

const currentTimestamp = Math.floor(Date.now() / 1000);
const startTime = currentTimestamp;
const endTime = currentTimestamp + 3600;

async function mintPublicTokens() {
  const mintPublicTx = await contract.connect(wallet).mintPublic(
    nftContract,
    feeRecipient,
    minterIfNotPayer,
    quantity,
    startTime,
    endTime,
    {
        gasLimit: 300000,
    }
  );

  console.log("Transaction sent:", mintPublicTx.hash);
  const receipt = await mintPublicTx.wait();
  console.log("Transaction mined:", receipt.transactionHash);
}

mintPublicTokens();