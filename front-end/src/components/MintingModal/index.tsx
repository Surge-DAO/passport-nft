import React, { useState } from 'react';
import { StyleSheet, css } from 'aphrodite'
import { CrossmintPayButton } from '@crossmint/client-sdk-react-ui';
import { Alert, Container, Col, Modal, Row } from 'react-bootstrap';
import MainButton from '../MainButton';
import Operator from '../Operator';
import SquareButton from '../SquareButton';
import { STRINGS } from '../../strings';
import themeVariables from '../../themeVariables.module.scss';
import Allowlist from '../../lib/Allowlist';
import { errorHandler } from '../../utils/helpers';

declare let window: any;

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
    fontSize: '15px',
    '@media (max-width: 768px)': {
      fontSize: '13px'
    }
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
  address: string[];
  show: boolean;
  hide?: () => void;
  saleStatus: number;
}

interface MintingStatus {
  wait: boolean;
  message: string;
}

export default function MintingModal(params: MintingModalParams): JSX.Element {
  const { address, show, hide, saleStatus } = params;

  const initialMintStatus: MintingStatus = {
    wait: false,
    message: ''
  };

  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [mintNumber, setMintNumber] = useState<number>(1);
  const [error, setError] = useState<boolean>(false);
  const [transactionHash, setTransactionHash] = useState<string>('');
  const [mintStatus, setMintStatus] = useState<MintingStatus>(initialMintStatus);

  function increaseMint() {
    return mintNumber <= 4 ? setMintNumber(mintNumber + 1) : null;
  }

  function decreaseMint() {
    return mintNumber === 1 ? null : setMintNumber(mintNumber - 1);
  }

  function mintHandler() {
    if (saleStatus === 1) {
      try {
        presaleMintHandler();
      } catch (e) {
        setError(true);
        setMintStatus({ wait: false, message: STRINGS.presaleNotOpen });
      }
    } else if (saleStatus === 2) {
      try {
        return publicSaleMintHandler();
      } catch (e) {
        setError(true);
        setMintStatus({ wait: false, message: STRINGS.publicSaleNotOpen });
      }
    } else if (saleStatus === 3) {
      setError(true)
      setMintStatus({ wait: true, message: STRINGS.soldOut });
    }
  }

  async function presaleMintHandler() {
    const price = await window.contract.price();

    try {
      setError(false);
      setMintStatus({ wait: true, message: STRINGS.mintWait });
      const merkleProof = Allowlist.getProofForAddress(address[0]);
      const presaleMintTransaction = await window.contract.presaleMint(mintNumber, merkleProof, { value: price.mul(mintNumber) });
      setTransactionHash(presaleMintTransaction.hash);
      setShowAlert(true);
      setMintStatus({ wait: false, message: STRINGS.mintWait });
      await presaleMintTransaction.wait();
      setMintStatus({ wait: false, message: `${STRINGS.mintSuccess} ${presaleMintTransaction.hash}` });
    } catch (e: any) {
      setMintStatus({ wait: false, message: errorHandler(e) });
      setError(true);
      setShowAlert(true);
    }
  }

  async function publicSaleMintHandler() {
    const price = await window.contract.price();

    try {
      setError(false);
      const nftTransaction = await window.contract.mint(address[0], mintNumber, { value: price.mul(mintNumber) });
      setMintStatus({ wait: true, message: STRINGS.mintWait })
      setTransactionHash(nftTransaction.hash);
      setShowAlert(true);
      await nftTransaction.wait();
      setMintStatus({ wait: false, message: `${STRINGS.mintSuccess} ${nftTransaction.hash}` });
    } catch (e: any) {
      setError(true);
      setMintStatus({ wait: false, message: errorHandler(e) });
      setShowAlert(true);
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
              <p className={css(styles.bottomPadding)}>{STRINGS.mintETH}</p>
              <MainButton disable={saleStatus === 0 || !address.length || mintStatus.wait} callToAction={`Mint ${mintNumber} NFT${mintNumber > 1 ? 's' : ''} with ETH`} primary action={mintHandler} />
            </Col>
            <Col>
              <p className={css(styles.bottomPadding)}>{saleStatus === 2 ? STRINGS.crossmintDisclaimer : STRINGS.publicSaleNotActive}</p>
              <CrossmintPayButton
                collectionTitle={STRINGS.surgePassportNFT}
                collectionDescription={STRINGS.surgeCollectionDescription}
                collectionPhoto="https://res.cloudinary.com/dacofvu8m/image/upload/v1650844376/Surge/surge-willow_flffp2.png"
                clientId="83b8ac08-313a-4615-8700-e8ec4658dc39"
                mintConfig={{
                  price: "0.08",
                  type: "erc-721",
                  _amountOfTokens: mintNumber
                }}
                className={css(styles.crossMintBtn)}
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
              <Alert.Link href={`https://etherscan.io/tx/${transactionHash}`}>{STRINGS.findYourTxn}</Alert.Link>
            </>
          )}
        </Alert>
      </Modal.Body>
    </Modal>
  )
}
