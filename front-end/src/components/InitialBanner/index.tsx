import React, { useState } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { JsonRpcSigner, JsonRpcProvider } from '@ethersproject/providers';
import MainButton from '../MainButton';
import Navbar from '../Navbar';
import MintingModal from '../MintingModal';
import WhatIsMintingModal from '../WhatIsMintingModal';
import PassportBanner from '../PassportBanner';
import { STRINGS } from '../../strings';
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

interface Params {
  addresses: string[];
  saleStatus: number;
  setAddresses: () => void;
  signer?: JsonRpcSigner;
  provider?: JsonRpcProvider;
}

export default function InitialComponent(params: Params): JSX.Element {
  const { addresses, provider, saleStatus, setAddresses, signer } = params;

  const [showModal, setShowModal] = useState<boolean>(false);
  const [showWhatIsMintingModal, setShowWhatIsMintingModal] = useState<boolean>(false);

  const isMintOpen = saleStatus && [1, 2].includes(saleStatus);

  return (
    <div className={css(styles.banner)}>
      <Navbar provider={provider} addresses={addresses} setAddresses={() => setAddresses} signer={signer} />
      <h1 className={css(styles.title)}>{STRINGS.surgePassportNFT}</h1>
      <PassportBanner />
      <div className={css(styles.bannerFooter)}>
        {saleStatus === 3 &&
          <MainButton primary callToAction={STRINGS.checkOutCollection} link={STRINGS.openSeaCollectionDomain} />
        }
        {[0, 1, 2].includes(saleStatus) &&
          <MainButton disable={!isMintOpen} callToAction={!isMintOpen ? STRINGS.presaleOpens : STRINGS.clickToMint} primary action={() => setShowModal(!showModal)} />
        }
        <MintingModal show={showModal} hide={() => setShowModal(false)} provider={provider} saleStatus={saleStatus} address={addresses} signer={signer} />
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
