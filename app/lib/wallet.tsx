import {
  connectorsForWallets,
  darkTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import {
  injectedWallet,
  rainbowWallet,
  metaMaskWallet,
  rabbyWallet,
  ledgerWallet,
  walletConnectWallet,
  frameWallet,
} from "@rainbow-me/rainbowkit/wallets";
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

const connectors = connectorsForWallets([
  {
    groupName: "Popular",
    wallets: [
      injectedWallet({ chains }),
      rabbyWallet({ chains }),
      frameWallet({ chains }),
      ledgerWallet({ chains, projectId: "52f4c9a0ddab3974d521f649e41a0d5d" }),
      metaMaskWallet({ chains, projectId: "52f4c9a0ddab3974d521f649e41a0d5d" }),
      rainbowWallet({ chains, projectId: "52f4c9a0ddab3974d521f649e41a0d5d" }),
      walletConnectWallet({
        chains,
        projectId: "52f4c9a0ddab3974d521f649e41a0d5d",
      }),
    ],
  },
]);

const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export const WalletConfig = ({ children }: { children: ReactNode }) => {
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider
        chains={chains}
        theme={darkTheme({
          fontStack: "system",
          borderRadius: "none",
        })}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};
