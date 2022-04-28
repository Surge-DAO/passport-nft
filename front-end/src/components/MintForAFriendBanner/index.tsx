import React, { useState } from 'react';
import { StyleSheet, css } from 'aphrodite';
import themeVariables from '../../themeVariables.module.scss';
import { STRINGS } from '../../strings/index';
import MainButton from '../MainButton';
import MintingForAFriendModal from '../MintForAFriendModal';

const styles = StyleSheet.create({
  friendMintBanner: {
    backgroundColor: themeVariables.secondaryColor,
    padding: '50px',
    textAlign: 'left',
    display: 'flex',
    '@media (max-width: 768px)': {
      display: 'block'
    }
  },
  title: {
    textAlign: 'left',
    color: themeVariables.primaryColor
  },
  text: {
    flex: 1,
    lineHeight: '10px'
  },
  btn: {
    width: '300px',
    marginTop: '13px'
  },
  smallFont: {
    fontSize: '15px'
  },
  textAlign: {
    textAlign: 'center'
  }
});

export interface Params {
  saleStatus: number;
  addresses: string[];
}

export default function MintForAFriendBanner(params: Params): JSX.Element {
  const { addresses, saleStatus } = params;

  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div className={css(styles.friendMintBanner)}>
      <div className={css(styles.text)}>
        <h4 className={css(styles.title)}>{STRINGS.finishedAndMintingFriend}</h4>
        <p className={css(styles.smallFont)} dangerouslySetInnerHTML={{ __html: STRINGS.targetAudience }} />
        <p className={css(styles.smallFont)}>{STRINGS.helpOnboard}</p>
      </div>
      <div className={css(styles.btn)}>
        <MainButton disable={!addresses.length} fullWidth callToAction={STRINGS.giftPassport} action={() => setShowModal(true)} />
        <p className={`${css(styles.smallFont)} ${css(styles.textAlign)}`}>After connecting your wallet 😉</p>
      </div>
      <MintingForAFriendModal show={showModal} hide={() => setShowModal(false)} saleStatus={saleStatus} addresses={addresses} />
    </div>
  );
}
