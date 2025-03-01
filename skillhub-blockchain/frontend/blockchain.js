import { ethers } from "ethers";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

socket.on("connect", () => {
    console.log("Connected to WebSocket server");
});

socket.on("TokensStaked", (data) => {
    console.log("Tokens staked:", data);
});

socket.on("TokensUnstaked", (data) => {
    console.log("Tokens unstaked:", data);
});

export const stakeTokens = async (amount) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const stakingContract = new ethers.Contract(stakingAddress, stakingABI, signer);
    const tx = await stakingContract.stakeTokens(ethers.utils.parseEther(amount));
    await tx.wait();
};

export const unstakeTokens = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const stakingContract = new ethers.Contract(stakingAddress, stakingABI, signer);
    const tx = await stakingContract.unstakeTokens();
    await tx.wait();
};
