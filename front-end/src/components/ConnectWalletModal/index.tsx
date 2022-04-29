import { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { StyleSheet, css } from 'aphrodite'
import { Alert, Modal } from 'react-bootstrap';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { CoinbaseWallet } from './Connectors';
import MainButton from '../MainButton';
import { isMobileDevice } from '../../utils/helpers';
import coinbaseLogo from '../../images/walletLogos/coinbase.png';
import surgeLogo from '../../images/Logo.png';
import metamaskLogo from '../../images/walletLogos/metamask.png';
import { STRINGS } from '../../strings';

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
  address: string;
  show: boolean;
  onHide: () => void;
  setAddress: (address: string) => any;
}

export default function ConnectWalletModal(params: Params): JSX.Element {
  const { address, show, onHide, setAddress } = params;

  const [showAlert, setShowAlert] = useState<boolean>(false);

  const { activate, deactivate } = useWeb3React();

  // async function walletConnect() {
  //   try {
  //     const provider = new WalletConnectProvider({
  //       rpc: `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_PUBLIC_ID}`,
  //       infuraId: process.env.REACT_APP_INFURA_PUBLIC_ID
  //     });

  //     if (provider && window.ethereum){
  //       activate(WalletConnect);
  //       await provider.enable();
  //       window.ethereum.request({ method: 'eth_requestAccounts' }).then((response: any) => {
  //         const accounts: string[] = response as string[];
  //         setAddress(accounts);
  //       });
  //     } else {
  //       setShowAlert(true);
  //     }
  //   } catch (e: any) {
  //     console.error(STRINGS.walletNotConnected, e);
  //   }
  // }

  async function coinbaseWallet() {
    try {
      const provider = new WalletLinkConnector({
        url: `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_PUBLIC_ID}`,
        appName: "Surge Passport NFT",
        supportedChainIds: [1, 3, 4, 5, 42]
      });

      if (provider && window.ethereum) {
        activate(CoinbaseWallet);
        window.ethereum.request({ method: 'eth_requestAccounts' }).then((response: any) => {
        const accounts: string[] = response as string[];
        setAddress(accounts[0]);
        });
      } else {
        setShowAlert(true);
      }
    } catch (e: any) {
      console.error(STRINGS.walletNotConnected, e);
    }
  }

  async function metamaskConnect() {
    if (!window.ethereum) {
      setShowAlert(true);
    } else {
      await window.provider?.send('eth_requestAccounts', []);
        const address = await window.signer?.getAddress();
        setAddress(address);
    }
  }

  function logOut() {
    setAddress('');
    deactivate();
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
        {!!address && (
          <p className={css(styles.button)}><span className={css(styles.boldFont)}>{STRINGS.connectedAccount} </span>
            {address}
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
        {/* <MainButton action={() => walletConnect()} callToAction="Wallet Connect" img={walletConnectLogo} customStyle={css(styles.button)} /> */}
        <MainButton action={() => coinbaseWallet()} callToAction="Coinbase" img={coinbaseLogo} customStyle={css(styles.button)} />
        <MainButton link={STRINGS.visualLearnersDomain} img={surgeLogo} callToAction={STRINGS.dontHaveAWallet} customStyle={`${css(styles.button)} ${css(styles.createWalletBtn)}`} />
        <br />
        {!!address && <MainButton primary action={logOut} callToAction={STRINGS.logOut} />}
      </Modal.Body>
    </Modal>
  )
}
