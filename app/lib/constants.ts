import { mainnet, arbitrum, polygon } from "wagmi/chains";

export const contracts = {
  [mainnet.id]: { usdc: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" },
  [arbitrum.id]: { usdc: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831" },
  [polygon.id]: { usdc: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174" },
};
