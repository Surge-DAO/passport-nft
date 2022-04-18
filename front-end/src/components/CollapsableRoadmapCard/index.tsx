import { useState } from 'react';
import { StyleSheet, css } from 'aphrodite';
import themeVariables from '../../themeVariables.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { CardParams } from '../RoadMapCard';

const styles = StyleSheet.create({
  card: {
    boxShadow: `5px 10px 18px 5px ${themeVariables.secondaryColor}`,
    border: `1px solid  ${themeVariables.thirdColor}`,
    borderRadius: '8px',
    margin: '24px',
    backgroundColor: themeVariables.whiteColor
  },
  cardActive: {
    boxShadow: `1px 1px 8px ${themeVariables.primaryColor}`,
    border: `1px solid ${themeVariables.primaryColor}`,
  },
  cardInactive: {
    boxShadow: `1px 1px 8px ${themeVariables.secondaryColor}`,
    border: `1px solid ${themeVariables.secondaryColor}`,
  },
  questionSection: {
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: '24px',
    marginRight: '24px',
    textAlign: 'left'
  },
  title: {
    marginTop: '15px',
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
    marginTop: '15px'
  },
  listStyle: {
    listStyleType: 'disc',
    listStylePosition: 'inside',
    textAlign: 'left',
    margin: '10px 48px',
    fontSize: '18px'
  }
});

export default function CollapsableRoadmapCard(params: CardParams): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const cardStyle = params.active ? css(styles.cardActive) : css(styles.cardInactive);

  return (
    <div className={`${css(styles.card)} ${cardStyle}`} onClick={() => setOpen(!open)}>
      <div className={!open ? `${css(styles.questionSection)}`  :  `${css(styles.questionSection)} ${css(styles.title)}`}>
        <h5>{params.title}</h5>
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
              dangerouslySetInnerHTML={{ __html: `${params.description}`.replace(/\n/g, '<br/>') }}
            ></p>
            <ul>
              {params.additionalSteps.map((item, id) => {
                return (
                  <li key={id} className={css(styles.listStyle)} dangerouslySetInnerHTML={{ __html: item.replace(/\n/g, '<br/>') }} />
                );
              })}
            </ul>
            <p className={css(styles.answer)}>{params.lastLine}</p>
          </div>
        )}
      </div>
    </div>
  );
}
