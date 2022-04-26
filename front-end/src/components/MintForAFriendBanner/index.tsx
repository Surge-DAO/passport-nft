import React, { useState } from 'react';
import { StyleSheet, css } from 'aphrodite';
import themeVariables from '../../themeVariables.module.scss';
import { STRINGS } from '../../strings/index';
import MainButton from '../MainButton';
import MintingForAFriendModal from '../MintForAFriendModal';
import { Params } from '../InitialBanner';

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
  }
});

export default function MintForAFriendBanner(params: Params): JSX.Element {
  const { provider, saleStatus } = params;

  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div className={css(styles.friendMintBanner)}>
      <div className={css(styles.text)}>
        <h4 className={css(styles.title)}>{STRINGS.finishedAndMintingFriend}</h4>
        <p dangerouslySetInnerHTML={{ __html: STRINGS.targetAudience }} />
        <p>{STRINGS.helpOnboard}</p>
      </div>
      <div className={css(styles.btn)}>
        <MainButton fullWidth callToAction={STRINGS.giftPassport} action={() => setShowModal(true)} />
      </div>
      <MintingForAFriendModal show={showModal} hide={() => setShowModal(false)} provider={provider} saleStatus={saleStatus} />
    </div>
  );
}
