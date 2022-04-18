import React, { useState } from 'react';
import { StyleSheet, css } from 'aphrodite'
import { STRINGS } from '../../strings';
import { Alert, Modal } from 'react-bootstrap';
import MainButton from '../MainButton';
import Operator from '../Operator';
import SquareButton from '../SquareButton';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { abi, contractAddress } from '../../data/Contract';

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
    fontWeight: 'bold'
  },
  alert: {
    maxWidth: '80%'
  },
  alertBodyP: {
    overflowWrap: 'anywhere'
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
        {!active && <p className={css(styles.bottomPadding)}>{STRINGS.pleaseConnectWallet}</p>}
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
              <Alert.Link href={`https://etherscan.io/tx/${transactionHash}`}>{STRINGS.findYourTxn}</Alert.Link>
            </>
          )}
        </Alert>
        <MainButton disable={!active || mintWait} callToAction={STRINGS.clickToMint} primary action={mintNFTHandler} />
      </Modal.Body>
    </Modal>
  )
}
