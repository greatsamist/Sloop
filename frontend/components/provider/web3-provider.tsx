import type { FC, ReactNode } from "react";
import { Fragment } from "react";
import { useRainbowTheme } from "@hooks";
import {
  connectorsForWallets,
  RainbowKitProvider,
  wallet,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
// import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import "@rainbow-me/rainbowkit/styles.css";

const needsInjectedWalletFallback = Boolean(
  typeof window !== "undefined" &&
    window.ethereum &&
    !window.ethereum.isMetaMask &&
    !window.ethereum.isCoinbaseWallet
);

const { chains, provider } = configureChains(
  [chain.polygonMumbai, chain.mainnet],
  [
    // jsonRpcProvider({
    //   rpc: () => ({ http: 'process.env.MUMBAI_API_KEY_URL' })
    // }),

    alchemyProvider({
      // This is Alchemy's default API key.
      // You can get your own at https://dashboard.alchemyapi.io
      alchemyId: "_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
    }),
    publicProvider(),
  ]
);

const connectors = connectorsForWallets([
  {
    groupName: "Popular",
    wallets: [
      wallet.metaMask({ chains, shimDisconnect: true }),
      wallet.rainbow({ chains }),
    ],
  },
  {
    groupName: "Others",
    wallets: [
      wallet.walletConnect({ chains }),
      wallet.coinbase({ appName: "InsureFi", chains }),
      ...(needsInjectedWalletFallback ? [wallet.injected({ chains })] : []),
    ],
  },
]);

const wagmiClient = createClient({
  provider,
  connectors,
  autoConnect: true,
});

export const Web3Provider: FC<Web3ProviderProps> = (
  props: Web3ProviderProps
) => {
  const { children } = props;

  const rainbowTheme = useRainbowTheme();

  return (
    <Fragment>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          chains={chains}
          theme={rainbowTheme}
          appInfo={{
            appName: "Straps",
            learnMoreUrl: "https://straps.vercel.app",
          }}
        >
          {children}
        </RainbowKitProvider>
      </WagmiConfig>
    </Fragment>
  );
};

interface Web3ProviderProps {
  children: ReactNode;
}
