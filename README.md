# NFT-Marketplace-task

Live Link: https://nft-marketplace-task-x3qg.vercel.app/

🧩 Section 2: Problem-Solving and Scenario-Based Questions

# Scenario:

Your team is facing performance issues with the current smart contracts due to high gas fees during minting. How would you address this problem? What optimizations would you consider?

# Answer:

To reduce high gas fees during the minting process, I would consider the following optimization strategies:

🔸 1. Use ERC721A Instead of Standard ERC721
ERC721A by Azuki is optimized for batch minting and significantly reduces gas costs when minting multiple NFTs in a single transaction.

🔸 2. Optimize Storage
Avoid unnecessary state variables.

Use mapping instead of dynamic arrays when possible.

Use uint256 (EVM-native) types to avoid type conversions.

Pack storage variables efficiently to reduce slot usage.

🔸 3. Use constant and immutable Keywords
For values like name, symbol, and baseURI, mark them as constant or immutable to reduce runtime storage reads.

🔸 4. Off-Chain Metadata
Instead of storing all NFT metadata on-chain, host metadata on IPFS or a centralized service and store only the base URI in the smart contract.

🔸 5. Batch Minting Support
Design the contract to allow users to mint multiple NFTs in one transaction to reduce overall gas usage per token.

🔸 6. Constructor Initialization
Initialize values inside the constructor where possible to avoid the need for later function calls that incur gas.

# Real-World Example:

Discuss a challenging blockchain project you have worked on. What were the main hurdles, and how did you resolve them?

# Answer:

In a recent NFT project I worked on, we faced several key challenges:
High Gas Cost During Minting: Initially, we used the standard ERC721 contract, which became expensive as users tried to mint multiple tokens.
Contract Size Limitation: As features increased, we began hitting the EVM contract size limit.
Metadata Management Issues: Uploading and managing token metadata on-chain was inefficient and costly.

✅ Solutions:
We switched to ERC721A, which drastically reduced the gas cost for batch minting.
We modularized our contract to keep it below the EVM size limit.
We offloaded token metadata to IPFS and referenced it using a base URI, which was stored in the contract.
