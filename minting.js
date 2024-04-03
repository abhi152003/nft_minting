const { ethers } = require("ethers");
const contractAddress = "0x2a68D229dD1f60F1Be6E295230EbC2c5C9C78380";
const contractABI = require("./seaDrop.json");
const providerUrl = "https://sepolia.mode.network";

const provider = new ethers.providers.JsonRpcProvider(providerUrl);

const privateKey =
  "22f3135a704341aa2f50c87d73fb484d8cf8bccc2e85519aac2300756e975ebb"; // Replace with your private key
const wallet = new ethers.Wallet(privateKey, provider);

const contract = new ethers.Contract(contractAddress, contractABI, wallet);

console.log(wallet.address);

const configStruct = {
  maxSupply: 10,
  baseURI: '',
  contractURI: '',
  seaDropImpl: '0x133878C0A3c07FD77A5803d16D7BF6159480fddc',
  publicDrop: {
    mintPrice: 1000000000000000,
    startTime: 1712053232,
    endTime: 1712226032,
    maxTotalMintableByWallet: 10,
    feeBps: 250,
    restrictFeeRecipients: true
  },
  dropURI: 'https://opensea-drops.mypinata.cloud/ipfs/bafkreifi6vtufqrcey646geknp7kuzrzysid5xugs2345wunp4q252erdy',
  allowListData: {
    merkleRoot: '0x0000000000000000000000000000000000000000000000000000000000000000',
    publicKeyURIs: [],
    allowListURI: ''
  },
  creatorPayoutAddress: '0x160BCEdf12B4eE894a8f0faE0156e99f533ad534',
  provenanceHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
  allowedFeeRecipients: [],
  disallowedFeeRecipients: [],
  allowedPayers: [],
  disallowedPayers: [],
  tokenGatedAllowedNftTokens: [],
  tokenGatedDropStages: [],
  disallowedTokenGatedAllowedNftTokens: [],
  signers: [],
  signedMintValidationParams: [],
  disallowedSigners: []
};

async function mintPublicTokens() {
  const multiConfigure = await contract.connect(wallet).multiConfigure(
    configStruct,
    {
      gasLimit: 300000,
    }
  );

  console.log("Transaction sent:", multiConfigure.hash);
  const receipt = await multiConfigure.wait();
  console.log("Transaction mined:", receipt.transactionHash);
}

mintPublicTokens();