import { ethers } from 'ethers';

export const createEventBazaarContract = (contractAddress, provider, contractABI) => {
  const signer = provider.getSigner();
  const eventsBazaarContract = new ethers.Contract(contractAddress, contractABI, signer);
  return eventsBazaarContract;
};

export const createEventNFTContract = (contractAddress, provider, contractABI) => {
  const signer = provider.getSigner();
  const eventNFTContract = new ethers.Contract(contractAddress, contractABI, signer);
  return eventNFTContract;
};
