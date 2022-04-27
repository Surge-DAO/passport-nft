import { CardParams } from '../../src/components/RoadMapCard';

export const roadMapItems: CardParams[] = [
  {
    title: 'Surge Community',
    stepNo: 1,
    description:
      'We launched a vibrant Discord community with thousands of Surge heroines and allies sharing educational insights and collaborating on fun projects.',
    additionalSteps: [
      'We’ve created lots of <a href="https://www.surgewomen.io/learn-about-web3" style="color: #f86464; font-weight: 600;" target=”_blank”> educational content </a> for our community.',
      'We send out a <a href="https://newsletter.surgewomen.io/" style="color: #f86464; font-weight: 600;" target=”_blank”> weekly newsletter </a> with updates and educational insights.',
      'We host a <a href="https://jobs.surgewomen.io/jobs" style="color: #f86464; font-weight: 600;" target=”_blank”> job board </a>connecting our female talent with top Web3 organizations.'
    ],
    active: true
  },
  {
    title: 'NFT Team',
    stepNo: 2,
    description: 'Our all-female engineering team is building the Surge NFT contracts and minting site.  Our leads have been working on partnering with the best mission-aligned Web3 organizations.',
    additionalSteps: [
      '<b>Partnerships:</b> Locking in partnerships with the coolest orgs in the space to provide perks to give our token-holders skin in the crypto game.',
      '<b>Art:</b> Our artist hand-designed layers that our custom-built generative art algorithm then automatically transforms into 5,000 beautiful PFPs based on the rules <a href=" https://twitter.com/kiri_xyz" style="color: #f86464; font-weight: 600;" target=”_blank”> the artist </a>  provided.🔥'
    ],
    active: true
  },
  {
    title: 'Pre-sale strategy',
    stepNo: 3,
    description: ' In an effort to ensure we get Passports into the hands of as many womxn as possible, we have:',
    additionalSteps: [
      'Opened the pre-sale list to our Discord community to reward early members (currently estimated to be around 85% womxn).',
      'We’ve partnered with other female-focused projects, extending a limited number of pre-sale spots to communities like My BFF, Boys Club, WOWPixies and others who are mostly womxn and whom we trust have a doxxed team and an aligned mission.'
    ],
    active: true
  },
  {
    title: 'Minting Begins',
    stepNo: 4,
    description: 'Minting will start on April 28th.',
    additionalSteps: [],
    active: false
  },
  {
    title: 'Partnerships Kick-off',
    stepNo: 5,
    description:
      'Immediately after minting, token-holders can start to claim their perks. We have set up a <a href="https://perks.surgewomen.io/" style="color: #f86464; font-weight: 600;" target=”_blank”> Perks Dashboard </a> where users redeem perks and make the most out of their Passport!',
    additionalSteps: [],
    active: false
  },
  {
    title: 'Future Drops',
    stepNo: 6,
    description:
      'The Surge team will continue to add perks for holders as time goes by. HODLing pays off 😛 and we’ll be working in Seasons. We\'ll be releasing batches of new perks and partnerships every couple of months 😉 .',
    additionalSteps: [],
    active: false
  },
  {
    title: 'Surge Future',
    stepNo: 7,
    description:
      'With a north start of bringing more women into Web3, we have a few items on our roadmap',
    additionalSteps: [
      'Continue providing perks to token-holders in Seasons',
      'Set up Surge IRL events around the world for community members (not just token-holders)',
      'Gamifying, innovating, and increasing our educational content both sync and asynchronously',
      'Focus more on research to increase the value we can unlock for women in the space',
      'Boosting our software products to make it even easier for women to come into Web3'
    ],
    lastLine: 'Along with the innovative ideas our community keeps bringing along - stay tuned for more!',
    active: false
  }
];
