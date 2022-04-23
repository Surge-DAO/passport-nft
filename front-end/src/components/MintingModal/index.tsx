import React, { useEffect, useState } from 'react';
import { StyleSheet, css } from 'aphrodite'
import { CrossmintPayButton } from '@crossmint/client-sdk-react-ui';
import { Contract, ethers } from 'ethers';
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import { Alert, Container, Col, Modal, Row, Spinner } from 'react-bootstrap';
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
    maxWidth: '80%'
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
    background: themeVariables.primaryColor,
    color: themeVariables.darkColor,
    ':hover': {
      background: themeVariables.lightColor,
      color: themeVariables.lightColor,
      fontWeight: 800
    },
    ':disabled': {
      opacity: 0.65,
      pointerEvents: 'none'
    }
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

  const { account, active } = useWeb3React();
  const { ethereum } = window;

  const initialMintStatus: MintingStatus = {
    wait: false,
    message: ''
  };

  const [signer, setSigner] = useState<JsonRpcSigner | undefined>(undefined);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [mintNumber, setMintNumber] = useState<number>(1);
  const [error, setError] = useState<boolean>(false);
  const [transactionHash, setTransactionHash] = useState<string>('');
  const [mintStatus, setMintStatus] = useState<MintingStatus>(initialMintStatus);
  const [saleStatus, setSaleStatus] = useState<number>(0);

  useEffect(() => {
    const provider: Web3Provider = new ethers.providers.Web3Provider(ethereum);
    const signerReceived: JsonRpcSigner = provider.getSigner();

    setSigner(signerReceived);
  }, [ethereum]);

  useEffect(() => {
    getSaleStatus();
  })

  useEffect(() => {
    if (signer) {
      const nftContract: Contract = new ethers.Contract(contractAddress, abi, signer);
      nftContract.on("StatusUpdate", (saleStatusUpdate) => {
        setSaleStatus(saleStatusUpdate);
      })
    }
  }, [signer]);

  async function getSaleStatus() {
    if (signer) {
      const nftContract: Contract = new ethers.Contract(contractAddress, abi, signer);
      const status = await nftContract.status();

      setSaleStatus(status);
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
    if (ethereum) {
      const nftContract = new ethers.Contract(contractAddress, abi, signer);
      const price = await nftContract.price();

      try {
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
        <p>{STRINGS.howManyPassport}</p>
        <div className={css(styles.operatorContainer)}>
          <Operator text='-' action={decreaseMint} />
          <SquareButton value={mintNumber} />
          <Operator text='+' action={increaseMint} />
        </div>
        <Container>
          <Row>
            <Col>
              <p className={css(styles.bottomPadding)}>{!active ? STRINGS.pleaseConnectWallet : STRINGS.mintETH}</p>
              <MainButton disable={saleStatus === 0 || !active || mintStatus.wait} callToAction={STRINGS.ethMint} primary action={mintHandler} />
            </Col>
            <Col>
              <p className={css(styles.bottomPadding)}>{saleStatus === 2 ? STRINGS.crossmintDisclaimer : STRINGS.publicSaleNotActive}</p>
              <CrossmintPayButton
                collectionTitle="Surge Passport"
                collectionDescription="Grants you access to web3 perks"
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
        <br />
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
