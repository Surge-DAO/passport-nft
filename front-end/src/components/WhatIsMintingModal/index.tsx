// import React, {useState} from 'react';
import { StyleSheet, css } from 'aphrodite'
import { STRINGS } from '../../strings';
import { Modal } from 'react-bootstrap';
import MainButton from '../MainButton';
import { whatIsMinting } from '../../data/WhatIsMinting';

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

interface WhatIsMintingParams {
  show: boolean;
  hide?: () => void;
}

export default function WhatIsMintingModal(params: WhatIsMintingParams): JSX.Element {
  return(
    <div>
      <Modal
      show= {params.show}
      onHide= {params.hide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/* <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          
        </Modal.Title>
      </Modal.Header> */}
      <Modal.Body className={css(styles.wrapper)}>
        <h4>{STRINGS.whatIsMinting}</h4>
        <p>{STRINGS.mintingMeans}</p>
        <h4>{STRINGS.howToMint}</h4>
        { whatIsMinting.map((item, id) => {
            return <p key={id}> {id + 1}. {item.title}
                <MainButton callToAction={item.buttonTitle}/>
            </p>;
        }) }
      </Modal.Body>
    </Modal>
    </div>
  )
}