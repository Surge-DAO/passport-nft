import React, { useEffect, useState } from 'react';
import { StyleSheet, css } from 'aphrodite'
import { Contract, ethers } from 'ethers';
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import { Alert, Container, InputGroup, FormControl, Modal } from 'react-bootstrap';
import { useWeb3React } from '@web3-react/core';
import MainButton from '../MainButton';
import { STRINGS } from '../../strings';
import { abi, contractAddress } from '../../data/Contract';
import themeVariables from '../../themeVariables.module.scss';

declare var window: any

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
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
  font15: {
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
  smallText: {
    fontSize: '13px'
  },
  boldText: {
    fontWeight: 700
  },
  inputField: {
    paddingLeft: 0,
    marginTop: 20
  },
  errorText: {
    color: themeVariables.primaryColor
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

export default function MintingForAFriendModal(params: MintingModalParams): JSX.Element {
  const { show, hide } = params;

  const { active } = useWeb3React();
  const { ethereum } = window;

  const initialMintStatus: MintingStatus = {
    wait: false,
    message: ''
  };

  const [signer, setSigner] = useState<JsonRpcSigner | undefined>(undefined);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [transactionHash, setTransactionHash] = useState<string>('');
  const [mintStatus, setMintStatus] = useState<MintingStatus>(initialMintStatus);
  const [saleStatus, setSaleStatus] = useState<number>(0);
  const [friendAddress, setFriendAddress] = useState<string>('');

  useEffect(() => {
    const provider: Web3Provider = new ethers.providers.Web3Provider(ethereum);
    const signerReceived: JsonRpcSigner = provider.getSigner();

    setSigner(signerReceived);
  }, [ethereum]);

  useEffect(() => {
    if (signer) {
      const nftContract: Contract = new ethers.Contract(contractAddress, abi, signer);
      nftContract.on('StatusUpdate', (saleStatusUpdate) => {
        setSaleStatus(saleStatusUpdate);
      })
    }
  }, [signer]);

  async function switchNetwork() {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x1' }],
    })
  }

  useEffect(() => {
    getSaleStatus();
  })

  async function getSaleStatus() {
    if (signer) {
      const nftContract: Contract = new ethers.Contract(contractAddress, abi, signer);
      const status = await nftContract.status();

      setSaleStatus(status);
    }
  }

  function mintHandler() {
    if (saleStatus === 2) {
      return publicSaleMintHandler();
    } else if (saleStatus === 4) {
      setError(true)
      setMintStatus({ wait: true, message: STRINGS.soldOut });
    }
  }

  async function publicSaleMintHandler() {
    if (ethereum) {
      const { networkVersion } = ethereum;
      const nftContract = new ethers.Contract(contractAddress, abi, signer);
      const price = await nftContract.price();

      try {
        networkVersion !== 4 && switchNetwork();
        setError(false);
        const nftTransaction = await nftContract.mint(friendAddress, 1, { value: price.mul(1) });
        setMintStatus({ wait: true, message: STRINGS.mintWait })
        setTransactionHash(nftTransaction.hash);
        setShowAlert(true);
        await nftTransaction.wait();
        setMintStatus({ wait: false, message: `${STRINGS.mintSuccess} ${nftTransaction.hash}` });
      } catch (e: any) {
        setError(true);
        setMintStatus({ wait: false, message: STRINGS.errorBadAddress });
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
        <Modal.Title id="contained-modal-title">
          <h4>{STRINGS.giftToFriend}</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={css(styles.wrapper)}>
        <p className={css(styles.boldText)}>{STRINGS.mint1ForFriend}</p>
        <p className={css(styles.smallText)}>{STRINGS.nftPriceFriend}</p>
        <p className={css(styles.smallText)} dangerouslySetInnerHTML={{ __html: STRINGS.hiddenNFT }} />
        <br />
        <Container className={css(styles.inputField)}>
          <InputGroup size="lg">
            <InputGroup.Text id="inputGroup-sizing-lg">{STRINGS.friendETHAdress}</InputGroup.Text>
            <FormControl disabled={saleStatus !== 2} aria-label="Large" aria-describedby="inputGroup-sizing-sm" placeholder="0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB" onChange={(e) => setFriendAddress(e.target.value)} />
          </InputGroup>
          {[0, 1].includes(saleStatus) && <p className={css(styles.errorText)}>{STRINGS.onlyAvailablePublicSale}</p>}
          <br />
          {saleStatus === 2 && !active && <p className={css(styles.font15)}>{STRINGS.connectWalletToMint}</p>}
          <MainButton disable={saleStatus !== 2 || !active || mintStatus.wait} callToAction={STRINGS.mint1NFT} primary action={mintHandler} />
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
