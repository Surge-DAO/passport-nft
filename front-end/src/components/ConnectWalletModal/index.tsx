import { useWeb3React } from '@web3-react/core';
import { StyleSheet, css } from 'aphrodite'
import { Alert, Modal } from 'react-bootstrap';
import WalletConnectProvider from "@walletconnect/web3-provider";
import { CoinbaseWallet, WalletConnect } from './Connectors';
import MainButton from '../MainButton';
import coinbaseLogo from '../../images/walletLogos/coinbase.png';
import surgeLogo from '../../images/Logo.png';
import metamaskLogo from '../../images/walletLogos/metamask.png';
import walletConnectLogo from '../../images/walletLogos/walletConnect.png';
import { STRINGS } from '../../strings';
import { useState } from 'react';

declare let window: any;

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column'
  },
  button: {
    marginBottom: '10px',
    maxWidth: '100%'
  },
  bottomMargin: {
    marginBottom: '30px'
  },
  boldFont: {
    fontWeight: 'bold'
  },
  createWalletBtn: {
    fontWeight: 400
  }
});

interface Params {
  addresses: string[];
  show: boolean;
  onHide: () => void;
  setAddresses: (addresses: string[]) => any;
}

export default function ConnectWalletModal(params: Params): JSX.Element {
  const { addresses, show, onHide, setAddresses } = params;

  const [showAlert, setShowAlert] = useState<boolean>(false);

  const { activate, deactivate } = useWeb3React();

  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  async function walletConnect() {
    try {
      const provider = new WalletConnectProvider({
        rpc: `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_PUBLIC_ID}`,
        infuraId: process.env.REACT_APP_INFURA_PUBLIC_ID
      });

      if (provider) activate(WalletConnect);
      await provider.enable();
    } catch (e: any) {
      console.error(STRINGS.walletNotConnected, e);
    }
  }

  async function metamaskConnect() {
    if (isSafari) {
      setShowAlert(true);
    } else {
      await window.provider?.send('eth_requestAccounts', []);
      const address = await window.signer?.getAddress();
      setAddresses([address]);
    }
  }

  function logOut() {
    deactivate();
    setAddresses([]);
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h4>{STRINGS.connectWallet}</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={css(styles.wrapper)}>
        {!!addresses.length && (
          <p className={css(styles.button)}><span className={css(styles.boldFont)}>{STRINGS.connectedAccount} </span>
            {addresses[0]}
          </p>
        )}
        <br />
        <Alert variant="danger" show={showAlert}>
          <Alert.Heading>
            {STRINGS.browser}
          </Alert.Heading>
          <hr />
          <p className="mb-0">
            {STRINGS.browserNotSupported}
        </p>
        </Alert>
        <MainButton action={() => metamaskConnect()} callToAction="Metamask" img={metamaskLogo} customStyle={css(styles.button)} />
        <MainButton action={() => walletConnect()} callToAction="Wallet Connect" img={walletConnectLogo} customStyle={css(styles.button)} />
        <MainButton action={() => activate(CoinbaseWallet)} callToAction="Coinbase" img={coinbaseLogo} customStyle={css(styles.button)} />
        <MainButton link="https://www.surgewomen.io/learn-about-web3/open-a-wallet-101-for-visual-learners" img={surgeLogo} callToAction={STRINGS.dontHaveAWallet} customStyle={`${css(styles.button)} ${css(styles.createWalletBtn)}`} />
        <br />
        {!!addresses.length && <MainButton primary action={logOut} callToAction={STRINGS.logOut} />}
      </Modal.Body>
    </Modal>
  )
}
