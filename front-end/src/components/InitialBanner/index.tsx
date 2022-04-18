import React, { useState } from 'react';
import { StyleSheet, css } from 'aphrodite';
import themeVariables from '../../themeVariables.module.scss';
import gradientBackground from '../../images/gradient-background.png';
import { STRINGS } from '../../strings';
import MainButton from '../MainButton';
import Navbar from '../Navbar';
import MintingModal from '../MintingModal';
import WhatIsMintingModal from '../WhatIsMintingModal';
import PassportBanner from '../PassportBanner';

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
  }
});

export default function InitialComponent(): JSX.Element {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showWhatIsMintingModal, setShowWhatIsMintingModal] = useState<boolean>(false);

  return (
    <div className={css(styles.banner)}>
      <Navbar />
      <h1 className={css(styles.title)}>Surge Passport NFT</h1>
      <PassportBanner />
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
