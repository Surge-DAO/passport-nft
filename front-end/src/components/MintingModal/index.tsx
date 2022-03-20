import React, {useState} from 'react';
import { StyleSheet, css } from 'aphrodite'
import { STRINGS } from '../../strings';
import { Modal } from 'react-bootstrap';
import MainButton from '../MainButton';
import Operator from '../Operator';
import SquareButton from '../SquareButton';

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
  }
})

interface MintingParams {
  show: boolean;
  hide?: () => void;
}

export default function MintingModal(params: MintingParams): JSX.Element {
  const [mintNumber, setMintNumber] = useState<number>(1)

  function increaseMint() {
    return mintNumber <= 4 ? setMintNumber(mintNumber + 1) : null;
  }

  function decreaseMint() {
    return mintNumber === 1 ? null : setMintNumber(mintNumber - 1);
  }

  return(
    <div>
      <Modal
      show= {params.show}
      onHide= {params.hide}
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
        <MainButton callToAction={STRINGS.clickToMint} primary action={() =>{console.log("call the minting function from the smart contracts")}}/>
      </Modal.Body>
    </Modal>
    </div>
  )
}
