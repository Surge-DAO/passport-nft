export interface WhatIsMinting {
    title: string;
    description: string;
    buttonTitle: string;
    buttonURL?: string;
    action?: () => void;
  }

  export const whatIsMinting: WhatIsMinting[] = [
    {
      title: '<span style="font-weight: bold;">Wallet setup</span>',
      description: 'Make sure your digital wallet (<a href="https://metamask.io/" target=”_blank”>Metamask</a>, <a href="https://www.coinbase.com/" target=”_blank”> Coinbase</a>, etc.) is set up',
      buttonTitle: 'Step-by-step guide to opening a Metamask Wallet',
      buttonURL: 'https://www.surgewomen.io/learn-about-web3/set-up-metamask-wallet'
    },
    {
      title: '<span style="font-weight: bold;">Enough amount</span>',
      description: 'Check your wallet has 0.08 ETH (<a href="https://www.surgewomen.io/learn-about-web3/what-is-ethereum" target=”_blank”>Ethereum cryptocurrency</a>) to mint, or “purchase” the NFT.',
      buttonTitle: 'Step-by-step guide to purchasing ETH',
      buttonURL: 'https://www.surgewomen.io/learn-about-web3/how-to-purchase-cryptocurrency'
    },
    {
      title: '<span style="font-weight: bold;">Connect wallet</span>',
      description: 'Close this modal and go to the navigation bar\'s top right corner, <span style="font-weight: bold;">click “Connect Wallet”</span>, and select your wallet-type (i.e Metamask).  Make sure you’re logged in, and your wallet is funded.<br />',
      buttonTitle: 'Close modal to Connect Wallet'
    },
    {
      title: '<span style="font-weight: bold;">Minting time</span>',
      description: 'Then, click on the button that says “Mint” and confirm the gas fee in your Metamask wallet. A “gas” fee is a transaction fee needed to purchase. Minting may take a few minutes.',
      buttonTitle: 'What are gas fees?',
      buttonURL: 'https://www.surgewomen.io/learn-about-web3/ethereum-gas-explained-a-guide-to-gas-fees'
    },
    {
      title: '<span style="font-weight: bold;">More help?</span>',
      description: 'Need more detailed pointers? We got you!',
      buttonTitle: 'What is minting article',
      buttonURL: 'https://surgewomen.io'
    },
  ];
