import { ethers } from "ethers";

const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
const contractABI = [
    "function balanceOf(address owner) view returns (uint256)",
    "function transfer(address to, uint amount) returns (bool)"
];

export const getBalance = async (address) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, contractABI, provider);
    const balance = await contract.balanceOf(address);
    return ethers.utils.formatEther(balance);
};

export const sendTokens = async (to, amount) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const tx = await contract.transfer(to, ethers.utils.parseEther(amount));
    await tx.wait();
};

const connectWallet = async () => {
    if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
    }
};

const handlePayment = async () => {
    await sendTokens("RECIPIENT_ADDRESS", "10"); // Send 10 SHT
};
