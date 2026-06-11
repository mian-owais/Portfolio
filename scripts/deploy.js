// Deploy script for PortfolioVerification smart contract
// Usage: npx hardhat run scripts/deploy.js --network sepolia

const hre = require("hardhat");

async function main() {
    console.log("Deploying PortfolioVerification contract...");
    
    try {
        // Get deployer account
        const [deployer] = await hre.ethers.getSigners();
        console.log("Deploying from:", deployer.address);
        
        // Get contract factory
        const PortfolioVerification = await hre.ethers.getContractFactory("PortfolioVerification");
        
        // Deploy contract
        const contract = await PortfolioVerification.deploy();
        await contract.waitForDeployment();
        
        const contractAddress = await contract.getAddress();
        console.log("✓ PortfolioVerification deployed successfully!");
        console.log("✓ Contract Address:", contractAddress);
        console.log("✓ Deployer Address:", deployer.address);
        
        // Display network information
        const network = hre.network.name;
        console.log("✓ Network:", network);
        
        // Save deployment information
        const deploymentInfo = {
            contractName: "PortfolioVerification",
            contractAddress: contractAddress,
            deployerAddress: deployer.address,
            deploymentNetwork: network,
            deploymentDate: new Date().toISOString(),
            blockNumber: await hre.ethers.provider.getBlockNumber(),
            transactionHash: contract.deploymentTransaction()?.hash,
        };
        
        // Log for documentation
        console.log("\n=== Deployment Summary ===");
        console.log(JSON.stringify(deploymentInfo, null, 2));
        
        // Wait for confirmations
        console.log("\nWaiting for confirmations...");
        await contract.deploymentTransaction().wait(5);
        console.log("✓ Deployment confirmed!");
        
        // Verify contract on block explorer (if applicable)
        const verifyUrl = getVerifyUrl(network, contractAddress);
        console.log("\nVerify your contract at:", verifyUrl);
        
        return contractAddress;
        
    } catch (error) {
        console.error("Deployment failed:", error);
        process.exit(1);
    }
}

function getVerifyUrl(network, address) {
    const urls = {
        sepolia: `https://sepolia.etherscan.io/address/${address}`,
        mainnet: `https://etherscan.io/address/${address}`,
        polygon: `https://polygonscan.com/address/${address}`,
        hardhat: "Local deployment - verification not needed",
    };
    return urls[network] || `Verify contract at: ${address}`;
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
