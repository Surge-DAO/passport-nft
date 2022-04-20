import React, { useState } from 'react';
import { StyleSheet, css } from 'aphrodite'
import { STRINGS } from '../../strings';
import { Alert, Container, Col, Modal, Row } from 'react-bootstrap';
import MainButton from '../MainButton';
import Operator from '../Operator';
import SquareButton from '../SquareButton';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { abi, contractAddress } from '../../data/Contract';
import { CrossmintPayButton } from '@crossmint/client-sdk-react-ui';
import themeVariables from '../../themeVariables.module.scss';

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
      background: themeVariables.thirdColor,
      color: themeVariables.lightColor,
      fontWeight: 800
    }
  }
})

interface MintingParams {
  show: boolean;
  hide?: () => void;
}

export default function MintingModal(params: MintingParams): JSX.Element {
  const { show, hide } = params;

  const { active } = useWeb3React();

  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [mintNumber, setMintNumber] = useState<number>(1);
  const [mintingStatus, setMintingStatus] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [mintWait, setMintWait] = useState<boolean>(false);
  const [transactionHash, setTransactionHash] = useState<string>('');

  function increaseMint() {
    return mintNumber <= 4 ? setMintNumber(mintNumber + 1) : null;
  }

  function decreaseMint() {
    return mintNumber === 1 ? null : setMintNumber(mintNumber - 1);
  }

  async function mintNFTHandler() {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const nftContract = new ethers.Contract(contractAddress, abi, signer);
      const price = await nftContract.price();

      try {
        setMintWait(true);
        const nftTransaction = await nftContract.mint(mintNumber, { value: price.mul(mintNumber) });
        setError(false);
        setMintingStatus(`Minting happening right now. Will let you know once the transaction goes through.`);
        setTransactionHash(nftTransaction.hash);
        setShowAlert(true);
        await nftTransaction.wait();
        setMintWait(false);
        setMintingStatus(`Minting successful! Transaction id: ${nftTransaction.hash}`);
      } catch (e: any) {
        setMintWait(true);
        setError(true);
        setMintingStatus(e.error.message);
        setMintWait(false);
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
        <Alert variant={error ? "danger" : "success"} show={showAlert} className={css(styles.alert)}>
          <Alert.Heading>
            {error ? STRINGS.whoops : STRINGS.mintingSuspense}
          </Alert.Heading>
          <hr />
          <p className={`mb-0 ${css(styles.alertBodyP)}`}>
            {mintingStatus}
          </p>
          {!error && (
            <>
              <br />
              <Alert.Link href={`https://rinkeby.etherscan.io/tx/${transactionHash}`}>{STRINGS.findYourTxn}</Alert.Link>
            </>
          )}
        </Alert>
        <Container>
          <Row>
            <Col>
              {!active && <p className={css(styles.bottomPadding)}>{STRINGS.pleaseConnectWallet}</p>}
              <MainButton disable={!active || mintWait} callToAction={STRINGS.ethMint} primary action={mintNFTHandler} />
            </Col>
            <Col>
              <p className={css(styles.bottomPadding)}>{STRINGS.crossmintDisclaimer}</p>
              <CrossmintPayButton
                collectionTitle="Surge Passport"
                collectionDescription="Grants you access to web3 perks"
                clientId={process.env.REACT_APP_CROSSMINT_CLIENT_ID || ''}
                environment="staging"
                mintConfig={{
                  price: "0.08",
                  type: "erc-721",
                  amountOfTokens: mintNumber
                }}
                className={css(styles.crossMintBtn)}
              />
            </Col>
          </Row>
        </Container>
        <br />
      </Modal.Body>
    </Modal>
  )
}
