import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';

export const WalletConnect = new WalletConnectConnector({
  rpc: `https://rinkeby.infura.io/v3/62210cc974474745ab281c89351fbbca`,
  bridge: "https://bridge.walletconnect.org",
  supportedChainIds: [1, 3, 4, 5, 42]
});

export const Injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42]
});

export const CoinbaseWallet = new WalletLinkConnector({
  url: `https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`,
  appName: "Web3-react Demo",
  supportedChainIds: [1, 3, 4, 5, 42],
});
