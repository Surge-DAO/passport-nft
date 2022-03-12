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
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: '48px',
    textAlign: 'justify'
  },
  buttonContainer: {
    marginTop: '12px',
    marginBottom: '12px',
  },
  whatIsMintingTitle: {
    paddingLeft: '48px'
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
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h4 className={css(styles.whatIsMintingTitle)}>{STRINGS.whatIsMinting}</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={css(styles.wrapper)}>
        <p>{STRINGS.mintingMeans}</p>
        <h4>{STRINGS.howToMint}</h4>
        { whatIsMinting.map((item, id) => {
            return <div key={id} >
              <div dangerouslySetInnerHTML={{__html: item.title}}></div>
              <div className={css(styles.buttonContainer)}>
                <MainButton callToAction={item.buttonTitle}/>
              </div>
            </div>;
        }) }
      </Modal.Body>
    </Modal>
    </div>
  )
}