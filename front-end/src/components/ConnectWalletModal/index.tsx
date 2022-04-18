import { useWeb3React } from '@web3-react/core';
import { StyleSheet, css } from 'aphrodite'
import { Modal } from 'react-bootstrap';
import WalletConnectProvider from "@walletconnect/web3-provider";
import metamaskLogo from '../../images/walletLogos/metamask.png';
import walletConnectLogo from '../../images/walletLogos/walletConnect.png';
import coinbaseLogo from '../../images/walletLogos/coinbase.png';
import { STRINGS } from '../../strings';
import MainButton from '../MainButton';
import { CoinbaseWallet, Injected, WalletConnect } from './Connectors';
import { CrossmintPayButton } from "@crossmint/client-sdk-react-ui";

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
        rpc: `https://rinkeby.infura.io/v3/${process.env.INFURA_PUBLIC_ID}`,
        infuraId: process.env.INFURA_PUBLIC_ID,
        qrcodeModalOptions: {
          mobileLinks: [
            "rainbow",
            "metamask",
            "argent",
            "trust",
            "imtoken",
            "pillar"
          ]
        }
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
        {account && <p className={css(styles.button)}><span className={css(styles.boldFont)}>Connected address:</span> {account}</p>}
        {/* {window.ethereum?.networkVersion !== "1" && alert('You are in the wrong network. Please change into mainnet.')} */}
        <br />
        <MainButton action={() => {activate(Injected)}} callToAction="Metamask" img={metamaskLogo} customStyle={css(styles.button)} />
        <MainButton action={() => walletConnect()} callToAction="Wallet Connect" img={walletConnectLogo} customStyle={css(styles.button)} />
        <MainButton action={() => activate(CoinbaseWallet)} callToAction="Coinbase" img={coinbaseLogo} customStyle={css(styles.button)} />
        <br />
        <CrossmintPayButton
          collectionTitle="Surge Passport"
          collectionDescription="Grants you access to web3 perks"
          clientId="<YOUR_CLIENT_ID>"
          environment="rinkeby"
          mintConfig={{
            price: ".07",
            type: "erc-721A"
          }}
        />
        <br />
        {active && <MainButton primary action={deactivate} callToAction={STRINGS.logOut} />}
      </Modal.Body>
    </Modal>
  )
}
