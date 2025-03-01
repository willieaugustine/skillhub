const hre = require("hardhat");

async function main() {
    const SkillHubToken = await hre.ethers.getContractFactory("SkillHubToken");
    const skillHubToken = await SkillHubToken.deploy("1000000000000000000000000"); // 1 million tokens

    await skillHubToken.deployed();
    console.log("SkillHubToken deployed to:", skillHubToken.address);

    const SkillHubStaking = await hre.ethers.getContractFactory("SkillHubStaking");
    const skillHubStaking = await SkillHubStaking.deploy(skillHubToken.address);

    await skillHubStaking.deployed();
    console.log("SkillHubStaking deployed to:", skillHubStaking.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
