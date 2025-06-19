import { createThirdwebClient } from "thirdweb";
import { ethereum, polygon, bsc } from "thirdweb/chains";

// Create thirdweb client
export const client = createThirdwebClient({
  clientId: "264b61b6c4681cf728474af7c60c72a1",
});

// Define supported chains (including Tron)
export const supportedChains = [
  ethereum, 
  polygon, 
  bsc,
  {
    id: 1,
    name: "Tron Mainnet",
    rpc: "https://api.trongrid.io",
    nativeCurrency: {
      name: "TRX",
      symbol: "TRX",
      decimals: 6
    }
  }
];

// Default chain
export const defaultChain = ethereum; 