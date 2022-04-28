import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';

// export const WalletConnect = new WalletConnectConnector({
//   infuraId: process.env.REACT_APP_INFURA_PUBLIC_ID,
//   supportedChainIds: [1, 3, 4, 5, 42],
//   qrcodeModalOptions: {
//     mobileLinks: [
//       "argent",
//       "trust",
//       "imtoken",
//       "pillar",
//     ]
//   }
// });

export const Injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42]
});

export const CoinbaseWallet = new WalletLinkConnector({
  url: `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_PUBLIC_ID}`,
  appName: "Surge Passport NFT",
  supportedChainIds: [1, 3, 4, 5, 42]
});
