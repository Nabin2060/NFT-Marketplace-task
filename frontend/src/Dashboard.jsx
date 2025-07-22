import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import KuverseNFT from "../../artifacts/contracts/KuverseNFT.sol/KuverseNFT.json";

const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";

const Dashboard = () => {
  // Remove unused provider and signer
  const [account, setAccount] = useState(null);
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum && window.ethereum.selectedAddress) {
        await connectWallet();
      }
    };
    checkConnection();
  }, []);

  const connectWallet = async () => {
    try {
      const web3Modal = new Web3Modal();
      const instance = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(instance);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);
      fetchOwnedNFTs(address, signer);
    } catch (err) {
      console.error("Wallet connection failed", err);
    }
  };

  const fetchOwnedNFTs = async (address, signer) => {
    try {
      const contract = new ethers.Contract(
        contractAddress,
        KuverseNFT.abi,
        signer
      );
      const tokenIds = await contract.getOwnedTokens(address);
      const metadataList = await Promise.all(
        tokenIds.map(async (id) => {
          const [name, desc, rarity] = await contract.getMetadata(id);
          return { id: id.toString(), name, desc, rarity };
        })
      );
      setNfts(metadataList);
    } catch (err) {
      console.error("Failed to fetch NFTs", err);
    }
  };

  const logout = () => {
    setAccount(null);
    setNfts([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-8 text-blue-600">Dashboard</h2>
        <nav className="flex flex-col gap-4">
          <a href="#" className="text-gray-700 hover:text-blue-600">
            Home
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-600">
            NFTs
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-600">
            Profile
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-600">
            Settings
          </a>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome to Your Dashboard
          </h1>
          {account && (
            <button
              onClick={logout}
              className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
            >
              Logout
            </button>
          )}
        </header>
        {/* Main Area: Show connect button or dashboard */}
        {!account ? (
          <div className="flex flex-col items-center justify-center h-96">
            <button
              onClick={connectWallet}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg shadow hover:bg-blue-700"
            >
              Connect Wallet
            </button>
          </div>
        ) : (
          <div>
            {/* Cards/Widgets */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center">
                <span className="text-4xl font-bold text-blue-600">
                  {nfts.length}
                </span>
                <span className="text-gray-500 mt-2">NFTs Owned</span>
              </div>
              <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center">
                <span className="text-4xl font-bold text-green-600">
                  {nfts.filter((nft) => nft.rarity === "Rare").length}
                </span>
                <span className="text-gray-500 mt-2">Rare NFTs</span>
              </div>
              <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center">
                <span className="text-4xl font-bold text-yellow-600">5</span>
                <span className="text-gray-500 mt-2">Collections</span>
              </div>
            </div>
            {/* NFT List */}
            <h3 className="mt-8 text-xl font-semibold">Your NFTs:</h3>
            {nfts.map((nft) => (
              <div key={nft.id} className="border p-4 my-2 rounded bg-white">
                <p>
                  <strong>ID:</strong> {nft.id}
                </p>
                <p>
                  <strong>Name:</strong> {nft.name}
                </p>
                <p>
                  <strong>Description:</strong> {nft.desc}
                </p>
                <p>
                  <strong>Rarity:</strong> {nft.rarity}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
