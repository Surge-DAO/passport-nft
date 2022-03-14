import { useState } from 'react';
import { StyleSheet, css } from 'aphrodite';
import themeVariables from '../../themeVariables.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

const styles = StyleSheet.create({
  card: {
    boxShadow: `5px 10px 18px 5px ${themeVariables.secondaryColor}`,
    border: `1px solid  ${themeVariables.thirdColor}`,
    borderRadius: '8px',
    margin: '24px',
    backgroundColor: themeVariables.whiteColor
  },
  questionSection: {
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: '24px',
    marginRight: '24px',
    textAlign: 'left'
  },
  answerSection: {
    transition: '0.5s'
  },
  line: {
    border: `1px solid  ${themeVariables.secondaryColor}`
  },
  answer: {
    marginLeft: '24px',
    textAlign: 'left',
    padding: '10px'
  },
  icon: {
    marginTop: '20px'
  }
});

export interface FAQParams {
  question: string;
  answer: string;
  active?: boolean;
}

export default function FAQCard(params: FAQParams): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className={css(styles.card)} onClick={() => setOpen(!open)}>
      <div className={css(styles.questionSection)}>
        <h5>{params.question}</h5>
        {!open && (
          <FontAwesomeIcon className={css(styles.icon)} icon={faAngleDown} size="lg" onClick={() => setOpen(!open)} />
        )}
        {open && (
          <FontAwesomeIcon className={css(styles.icon)} icon={faAngleUp} size="lg" onClick={() => setOpen(!open)} />
        )}
      </div>
      <div>
        {open && (
          <div className={css(styles.answerSection)}>
            <hr className={css(styles.line)} />
            <p
              className={css(styles.answer)}
              dangerouslySetInnerHTML={{ __html: `${params.answer}`.replace(/\n/g, '<br/>') }}
            ></p>
          </div>
        )}
      </div>
    </div>
  );
}
