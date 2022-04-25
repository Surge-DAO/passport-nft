import React, { useEffect, useState } from 'react';
import { StyleSheet, css } from 'aphrodite'
import { CrossmintPayButton } from '@crossmint/client-sdk-react-ui';
import { Contract, ethers } from 'ethers';
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import { Alert, Container, Col, Modal, Row } from 'react-bootstrap';
import { useWeb3React } from '@web3-react/core';
import MainButton from '../MainButton';
import Operator from '../Operator';
import SquareButton from '../SquareButton';
import { STRINGS } from '../../strings';
import { abi, contractAddress } from '../../data/Contract';
import themeVariables from '../../themeVariables.module.scss';
import Allowlist from '../../lib/Allowlist';

declare var window: any

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '48px'
  },
  operatorContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '60%',
    margin: 'auto',
    padding: '24px',
    '@media (max-width: 768px)': {
      width: '100%'
    }
  },
  bottomPadding: {
    paddingBottom: '3%',
    fontSize: '15px'
  },
  alert: {
    marginTop: '20px',
    alignSelf: 'baseline',
    width: '100%'
  },
  alertBodyP: {
    overflowWrap: 'anywhere'
  },
  crossMintBtn: {
    border: 'none',
    boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.16)',
    borderRadius: '24px',
    fontFamily: themeVariables.secondaryFont,
    fontWeight: 800,
    padding: '16px 24px',
    background: themeVariables.lightColor,
    ':hover': {
      background: themeVariables.primaryColor,
      color: themeVariables.lightColor,
      fontWeight: 800
    },
    ':disabled': {
      opacity: 0.65,
      pointerEvents: 'none'
    }
  },
  smallText: {
    fontSize: '13px'
  },
  boldText: {
    fontWeight: 700
  }
})

interface MintingModalParams {
  show: boolean;
  hide?: () => void;
}

interface MintingStatus {
  wait: boolean;
  message: string;
}

export default function MintingModal(params: MintingModalParams): JSX.Element {
  const { show, hide } = params;

  const initialMintStatus: MintingStatus = {
    wait: false,
    message: ''
  };

  const { account, active } = useWeb3React();

  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [mintNumber, setMintNumber] = useState<number>(1);
  const [error, setError] = useState<boolean>(false);
  const [transactionHash, setTransactionHash] = useState<string>('');
  const [mintStatus, setMintStatus] = useState<MintingStatus>(initialMintStatus);
  const [saleStatus, setSaleStatus] = useState<number>(0);

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
  }, []);

  useEffect(() => {
    getSaleStatus();
  }, [])

  async function switchNetwork() {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x1' }],
    })
  }

  async function getSaleStatus() {
    const { ethereum } = window;
    ethereum && window.ethereum.enable();

    const provider: Web3Provider = new ethers.providers.Web3Provider(ethereum);
    const signer: JsonRpcSigner = provider.getSigner();

    if (signer) {
      const nftContract: Contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        const status = await nftContract.status();
        setSaleStatus(status);
      } catch (e) {
        console.error(e);
      }
    }
  }

  function increaseMint() {
    return mintNumber <= 4 ? setMintNumber(mintNumber + 1) : null;
  }

  function decreaseMint() {
    return mintNumber === 1 ? null : setMintNumber(mintNumber - 1);
  }

  function mintHandler() {
    if (saleStatus === 1) {
      return presaleMintHandler();
    } else if (saleStatus === 2) {
      return publicSaleMintHandler();
    } else if (saleStatus === 3) {
      setError(true)
      setMintStatus({ wait: true, message: STRINGS.soldOut });
    }
  }

  async function presaleMintHandler() {
    const { ethereum } = window;
    ethereum && window.ethereum.enable();

    const provider: Web3Provider = new ethers.providers.Web3Provider(ethereum);
    const signer: JsonRpcSigner = provider.getSigner();

    if (ethereum) {
      const nftContract: Contract = new ethers.Contract(contractAddress, abi, signer);
      const price = await nftContract.price();

      try {
        setError(false);
        setMintStatus({ wait: true, message: STRINGS.mintWait });
        const merkleProof = Allowlist.getProofForAddress(account!);
        const presaleMintTransaction = await nftContract.presaleMint(mintNumber, merkleProof, { value: price.mul(mintNumber) });
        setTransactionHash(presaleMintTransaction.hash);
        setShowAlert(true);
        setMintStatus({ wait: false, message: STRINGS.mintWait });
        await presaleMintTransaction.wait();
        setMintStatus({ wait: true, message: `${STRINGS.mintSuccess} ${presaleMintTransaction.hash}` });
      } catch (e: any) {
        setMintStatus({ wait: false, message: e.error.message });
        setError(true);
        setShowAlert(true);
      }
    }
  }

  async function publicSaleMintHandler() {
    const { ethereum } = window;
    ethereum && window.ethereum.enable();

    const provider: Web3Provider = new ethers.providers.Web3Provider(ethereum);
    const signer: JsonRpcSigner = provider.getSigner();

    if (ethereum) {
      const { networkVersion } = ethereum;
      const nftContract = new ethers.Contract(contractAddress, abi, signer);
      const price = await nftContract.price();

      try {
        networkVersion !== 4 && switchNetwork();
        setError(false);
        const nftTransaction = await nftContract.mint(account, mintNumber, { value: price.mul(mintNumber) });
        setMintStatus({ wait: true, message: STRINGS.mintWait })
        setTransactionHash(nftTransaction.hash);
        setShowAlert(true);
        await nftTransaction.wait();
        setMintStatus({ wait: false, message: `${STRINGS.mintSuccess} ${nftTransaction.hash}` });
      } catch (e: any) {
        setError(true);
        setMintStatus({ wait: false, message: e.error.message });
        setShowAlert(true);
      }
    }
  }

  return (
    <Modal
      show={show}
      onHide={hide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h4>{STRINGS.mintPassport}</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={css(styles.wrapper)}>
        <p className={css(styles.boldText)}>{STRINGS.howManyPassport}</p>
        <p className={css(styles.smallText)}>{STRINGS.nftPrice}</p>
        <div className={css(styles.operatorContainer)}>
          <Operator text='-' action={decreaseMint} />
          <SquareButton value={mintNumber} />
          <Operator text='+' action={increaseMint} />
        </div>
        <Container>
          <Row>
            <Col>
              <p className={css(styles.bottomPadding)}>{!active ? STRINGS.pleaseConnectWallet : STRINGS.mintETH}</p>
              <MainButton disable={saleStatus === 0 || !active || mintStatus.wait} callToAction={`Mint ${mintNumber} NFT${mintNumber > 1 ? 's' : ''} with ETH`} primary action={mintHandler} />
            </Col>
            <Col>
              <p className={css(styles.bottomPadding)}>{saleStatus === 2 ? STRINGS.crossmintDisclaimer : STRINGS.publicSaleNotActive}</p>
              <CrossmintPayButton
                collectionTitle={STRINGS.surgePassportNFT}
                collectionDescription={STRINGS.surgeCollectionDescription}
                collectionPhoto="https://res.cloudinary.com/dacofvu8m/image/upload/v1650844376/Surge/surge-willow_flffp2.png"
                clientId={process.env.REACT_APP_CROSSMINT_CLIENT_ID || ''}
                environment="staging"
                mintConfig={{
                  price: "0.08",
                  type: "erc-721",
                  _amountOfTokens: mintNumber
                }}
                className={css(styles.crossMintBtn)}
                disabled={saleStatus !== 2}
              />
            </Col>
          </Row>
        </Container>
        <Alert variant={error ? "danger" : "success"} show={showAlert} className={css(styles.alert)}>
          <Alert.Heading>
            {error ? STRINGS.whoops : STRINGS.mintingSuspense}
          </Alert.Heading>
          <hr />
          <p className={`mb-0 ${css(styles.alertBodyP)}`}>
            {mintStatus.message}
          </p>
          {!error && (
            <>
              <br />
              <Alert.Link href={`https://rinkeby.etherscan.io/tx/${transactionHash}`}>{STRINGS.findYourTxn}</Alert.Link>
            </>
          )}
        </Alert>
      </Modal.Body>
    </Modal>
  )
}
