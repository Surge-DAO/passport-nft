import React, { useEffect, useState } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Contract, ethers } from 'ethers';
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import MainButton from '../MainButton';
import Navbar from '../Navbar';
import MintingModal from '../MintingModal';
import WhatIsMintingModal from '../WhatIsMintingModal';
import PassportBanner from '../PassportBanner';
import { STRINGS } from '../../strings';
import { abi, contractAddress } from '../../data/Contract';
import gradientBackground from '../../images/gradient-background.png';
import themeVariables from '../../themeVariables.module.scss';

const styles = StyleSheet.create({
  banner: {
    width: '100vw',
    textAlign: 'center',
    backgroundImage: `url(${gradientBackground})`,
    backgroundSize: 'cover',
    paddingVertical: '5%',
    overflow: 'hidden'
  },
  title: {
    paddingTop: '5%',
    paddingBottom: '5%',
    paddingLeft: '10%',
    paddingRight: '10%',
    '@media (min-width: 320px) and (max-width: 768px)': {
      fontSize: '20px'
    }
  },
  bannerFooter: {
    paddingTop: '3%',
    paddingBottom: '5%'
  },
  mintingText: {
    paddingTop: '1%'
  },
  whatIsMintingModalButton: {
    background: 'none',
    color: 'inherit',
    border: 'none',
    padding: 0,
    font: 'inherit',
    cursor: 'pointer',
    outline: 'inherit',
    ':hover': {
      color: themeVariables.primaryColor
    }
  },
  soldOutCaption: {
    marginTop: '15px',
    fontWeight: 400
  }
});

export default function InitialComponent(): JSX.Element {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showWhatIsMintingModal, setShowWhatIsMintingModal] = useState<boolean>(false);
  const [saleStatus, setSaleStatus] = useState<number>(0);

  useEffect(() => {
    getSaleStatus();
  })

  useEffect(() => {
    const { ethereum } = window;
    ethereum && window.ethereum.enable();

    const provider: Web3Provider = new ethers.providers.Web3Provider(ethereum);
    const signer: JsonRpcSigner = provider.getSigner();

    if (signer) {
      const nftContract: Contract = new ethers.Contract(contractAddress, abi, signer);
      nftContract.on('StatusUpdate', (saleStatusUpdate) => {
        setSaleStatus(saleStatusUpdate);
      })
    }
  });

  async function getSaleStatus() {
    const { ethereum } = window;
    ethereum && ethereum.enable();
    const provider: Web3Provider = new ethers.providers.Web3Provider(ethereum);
    const signer: JsonRpcSigner = provider.getSigner();

    if (ethereum && signer) {
      try {
        const nftContract: Contract = new ethers.Contract(contractAddress, abi, signer);
        const status = await nftContract.status();
        setSaleStatus(status);
      } catch (e) {
        console.error(e);
      }
    }
  }

  const isMintOpen = saleStatus && [1, 2].includes(saleStatus);

  return (
    <div className={css(styles.banner)}>
      <Navbar />
      <h1 className={css(styles.title)}>{STRINGS.surgePassportNFT}</h1>
      <PassportBanner />
      <div className={css(styles.bannerFooter)}>
        {saleStatus === 3 &&
          <MainButton primary callToAction={STRINGS.checkOutCollection} link={STRINGS.openSeaCollectionDomain} />
        }
        {[0, 1, 2].includes(saleStatus) &&
          <MainButton disable={!isMintOpen} callToAction={!isMintOpen ? STRINGS.presaleOpens : STRINGS.clickToMint} primary action={() => setShowModal(!showModal)} />
        }
        <MintingModal show={showModal} hide={() => setShowModal(false)} />
        {saleStatus === 3 &&
          <p className={css(styles.soldOutCaption)} dangerouslySetInnerHTML={{ __html: STRINGS.soldOutCaption }} />
        }
        {saleStatus !== 3 && (
          <div className={css(styles.mintingText)}>
            <button className={css(styles.whatIsMintingModalButton)} onClick={() => setShowWhatIsMintingModal(!showWhatIsMintingModal)}>
              {STRINGS.whatIs}
              <span>
                <strong> {STRINGS.mint}</strong>
              </span>
            </button>
            <WhatIsMintingModal show={showWhatIsMintingModal} hide={() => setShowWhatIsMintingModal(false)}/>
          </div>
        )}
      </div>
    </div>
  );
}
