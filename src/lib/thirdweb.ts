import { createThirdwebClient } from "thirdweb";
import { ethereum, polygon, bsc } from "thirdweb/chains";

// Create thirdweb client
export const client = createThirdwebClient({
  clientId: "264b61b6c4681cf728474af7c60c72a1",
});

// Define supported chains
export const supportedChains = [ethereum, polygon, bsc];

// Default chain
export const defaultChain = ethereum; 