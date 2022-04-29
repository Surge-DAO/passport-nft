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
      description: 'Make sure your digital wallet (<a href="https://metamask.io/" target=”_blank”>Metamask</a>, <a href="https://www.coinbase.com/" target=”_blank”> Coinbase</a>, etc.) is set up. If it is, be sure to click the "Connect Wallet" button at the top right corner of the site before attempting to mint.',
      buttonTitle: 'Step-by-step guide to opening a Metamask Wallet',
      buttonURL: 'https://www.surgewomen.io/learn-about-web3/set-up-metamask-wallet'
    },
    {
      title: '<span style="font-weight: bold;">Enough amount</span>',
      description: 'Check your wallet has 0.08 ETH (<a href="https://www.surgewomen.io/learn-about-web3/what-is-ethereum" target=”_blank”>Ethereum cryptocurrency</a>) per NFT you’d like to mint or “purchase”, plus an additional amount for gas fees (what are gas fees article).... see section below.',
      buttonTitle: 'Step-by-step guide to purchasing ETH',
      buttonURL: 'https://www.surgewomen.io/learn-about-web3/how-to-purchase-cryptocurrency'
    },
    {
      title: '<span style="font-weight: bold;">Connect wallet</span>',
      description: 'Close this modal and go to the navigation bar\'s top right corner, <span style="font-weight: bold;">click “Connect Wallet”</span>, and select your wallet-type (i.e Metamask).  Make sure you’re logged in, and your wallet is funded.',
      buttonTitle: 'Close this to Connect Wallet'
    },
    {
      title: '<span style="font-weight: bold;">Minting time</span>',
      description: 'Then, click on the button that says “Mint” and confirm the gas fee in your Metamask wallet. A “gas” fee is a transaction fee needed to purchase. Minting may take a few minutes.',
      buttonTitle: 'What are gas fees?',
      buttonURL: 'https://www.surgewomen.io/learn-about-web3/ethereum-gas-explained-a-guide-to-gas-fees'
    },
    {
      title: '<span style="font-weight: bold;">More help?</span>',
      description: 'Need more detailed pointers? We got you! Here\'s our detailed article on how to mint.',
      buttonTitle: 'How to mint Article',
      buttonURL: 'https://www.surgewomen.io/learn-about-web3/how-to-mint-the-surge-passport-nft'
    },
    {
      title: '<span style="font-weight: bold;">Still Can’t Mint?</span>',
      description: `You might be trying to mint during the ‘presale’ mint period without a presale spot. Sign up for public sale reminders <a href="https://docs.google.com/forms/d/e/1FAIpQLSdVOZcCuzRgV58xWh0Mw83i6f9HTuC38iPSuRWe_SljwTQq-Q/viewform?edit2=2_ABaOnudgPdqoswMrXFA8sprW6TB_najCsj8Co2qCuDNUQ81Qj0Y6aOw-OICOWfSquQ" style="color: #f86464; font-weight: 600;" target=”_blank”>here</a>, or reach out to a Surge moderator on  <a href="https://discord.com/invite/m3BWTHDMdD" style="color: #f86464; font-weight: 600;" target=”_blank”> Discord</a>  to help trouble-shoot.`,
      buttonTitle: 'Sign up for public sale reminders',
      buttonURL: 'https://docs.google.com/forms/d/e/1FAIpQLSdVOZcCuzRgV58xWh0Mw83i6f9HTuC38iPSuRWe_SljwTQq-Q/viewform'
    },
  ];
