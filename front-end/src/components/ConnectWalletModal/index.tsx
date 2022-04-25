import { useWeb3React } from '@web3-react/core';
import { StyleSheet, css } from 'aphrodite'
import { Modal } from 'react-bootstrap';
import WalletConnectProvider from "@walletconnect/web3-provider";
import { CoinbaseWallet, Injected, WalletConnect } from './Connectors';
import MainButton from '../MainButton';
import coinbaseLogo from '../../images/walletLogos/coinbase.png';
import surgeLogo from '../../images/Logo.png';
import metamaskLogo from '../../images/walletLogos/metamask.png';
import walletConnectLogo from '../../images/walletLogos/walletConnect.png';
import { STRINGS } from '../../strings';

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column'
  },
  button: {
    marginBottom: '10px'
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
  show: boolean;
  onHide: () => void;
  setWalletStatus?: (c: string) => void;
}

export default function ConnectWalletModal(params: Params): JSX.Element {
  const { show, onHide } = params;
  const { active, account, activate, deactivate } = useWeb3React();

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
        {account && <p className={css(styles.button)}><span className={css(styles.boldFont)}>{STRINGS.connectedAccount}</span> {account}</p>}
        <br />
        <MainButton action={() => {activate(Injected)}} callToAction="Metamask" img={metamaskLogo} customStyle={css(styles.button)} />
        <MainButton action={() => walletConnect()} callToAction="Wallet Connect" img={walletConnectLogo} customStyle={css(styles.button)} />
        <MainButton action={() => activate(CoinbaseWallet)} callToAction="Coinbase" img={coinbaseLogo} customStyle={css(styles.button)} />
        <MainButton link="https://www.surgewomen.io/learn-about-web3/open-a-wallet-101-for-visual-learners" img={surgeLogo} callToAction={STRINGS.dontHaveAWallet} customStyle={`${css(styles.button)} ${css(styles.createWalletBtn)}`} />
        <br />
        {active && <MainButton primary action={deactivate} callToAction={STRINGS.logOut} />}
      </Modal.Body>
    </Modal>
  )
}
