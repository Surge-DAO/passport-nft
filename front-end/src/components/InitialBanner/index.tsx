import React, { useState } from 'react';
import MainButton from '../MainButton';
import { StyleSheet, css } from 'aphrodite';
import gradientBackground from '../../images/gradient-background.png';
import { STRINGS } from '../../strings';
import Image from 'react-bootstrap/Image';
import Navbar from '../Navbar';
import MintingModal from '../MintingModal';
import WhatIsMintingModal from '../WhatIsMintingModal';

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
    paddingRight: '10%'
  },
  bannerFooter: {
    paddingTop: '3%',
    paddingBottom: '5%'
  },
  mintingText: {
    paddingTop: '5%'
  },
  whatIsMintingModalButton: {
    background: 'none',
    color: 'inherit',
    border: 'none',
    padding: 0,
    font: 'inherit',
    cursor: 'pointer',
    outline: 'inherit',
  }
});

export default function InitialComponent(): JSX.Element {
  const [showModal, setShowModal] = useState(false)

  const [showWhatIsMintingModal, setShowWhatIsMintingModal] = useState(false);

  return (
    <div className={css(styles.banner)}>
      <Navbar />
      <h1 className={css(styles.title)}>Surge Passport NFT</h1>
      <Image src={require('../../images/nft-carousel.png')} alt="nft-sneak-peek" />
      <div className={css(styles.bannerFooter)}>
        <MainButton callToAction={STRINGS.clickToMint} primary action={() => setShowModal(!showModal)} />
        <MintingModal show={showModal} hide={() => setShowModal(false)} />
        <div className={css(styles.mintingText)}>
          <button className={css(styles.whatIsMintingModalButton)} onClick={() => setShowWhatIsMintingModal(!showWhatIsMintingModal)}>
            {STRINGS.whatIs}
            <span>
              <strong> {STRINGS.minting}</strong>
            </span>
          </button>
          <WhatIsMintingModal show={showWhatIsMintingModal} hide={() => setShowWhatIsMintingModal(false)}/>
        </div>
      </div>
    </div>
  );
}
