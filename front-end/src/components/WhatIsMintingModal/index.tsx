import { StyleSheet, css } from 'aphrodite';
import { STRINGS } from '../../strings';
import { Modal } from 'react-bootstrap';
import MainButton from '../MainButton';
import { whatIsMinting } from '../../data/WhatIsMinting';
import themeVariables from '../../themeVariables.module.scss';

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: '48px',
    paddingRight: '48px',
    textAlign: 'justify'
  },
  buttonContainer: {
    marginTop: '12px',
    marginBottom: '12px'
  },
  link: {
    color: themeVariables.primaryColor,
    ':hover': {
      fontWeight: 'bold'
    }
  }
})

interface WhatIsMintingParams {
  show: boolean;
  hide?: () => void;
}

export default function WhatIsMintingModal(params: WhatIsMintingParams): JSX.Element {
  const { show, hide } = params;

  return (
    <div>
      <Modal
      show={show}
      onHide={hide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h4>{STRINGS.whatIsMinting}</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={css(styles.wrapper)}>
        <p>{STRINGS.mintingMeans}</p>
        <h5>{STRINGS.howToMint}</h5>
        {whatIsMinting.map((item, id) => {
          return (
            <div key={id}>
              <div dangerouslySetInnerHTML={{__html: `${id + 1}. ${item.title}: ${item.description}`}} />
              {
                <div className={css(styles.buttonContainer)}>
                  <MainButton callToAction={item.buttonTitle} link={item.buttonURL} action={hide}/>
                </div>
              }
            </div>
          );
        })}
      </Modal.Body>
    </Modal>
    </div>
  )
}
