const hre = require("hardhat");

async function main() {
    const KuverseNFT = await hre.ethers.getContractFactory("KuverseNFT");
    const contract = await KuverseNFT.deploy();
    await contract.deployed();
    console.log("Contract deployed to:", contract.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});