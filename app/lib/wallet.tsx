import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { type ReactNode } from "react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

const { chains, publicClient } = configureChains(
  [polygonMumbai],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: "https://rpc.ankr.com/polygon_mumbai",
      }),
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "ZachXBT Refunds",
  projectId: "52f4c9a0ddab3974d521f649e41a0d5d",
  chains,
});

const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export const WalletConfig = ({ children }: { children: ReactNode }) => {
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiConfig>
  );
};
