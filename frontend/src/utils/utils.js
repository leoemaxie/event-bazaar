export const shortenAddress = (address) => {
    return `${address.slice(0, 7)}...${address.slice(address.length - 6)}`;
};