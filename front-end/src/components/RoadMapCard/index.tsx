import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import themeVariables from '../../themeVariables.module.scss';

const styles = StyleSheet.create({
  card: {
    borderRadius: '8px',
    padding: '10px',
    margin: '24px'
  },
  cardActive: {
    boxShadow: `1px 1px 8px ${themeVariables.primaryColor}`,
    border: `1px solid ${themeVariables.primaryColor}`,
  },
  cardInactive: {
    boxShadow: `1px 1px 8px ${themeVariables.secondaryColor}`,
    border: `1px solid ${themeVariables.secondaryColor}`,
  },
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    padding: '12px'
  },
  title: {
    display: 'inline',
    marginLeft: '12px'
  },
  stepNo: {
    display: 'inline',
    color: themeVariables.primaryColor
  },
  description: {
    textAlign: 'left',
    marginLeft: '24px',
    marginRight: '24px',
    lineHeight: '24px'
  },
  listStyle: {
    listStyleType: 'disc',
    listStylePosition: 'inside',
    textAlign: 'left',
    margin: '10px 48px',
    fontSize: '18px'
  }
});

export interface CardParams {
	title: string;
	stepNo: number;
	description: string;
	additionalSteps: string[];
  active: boolean;
}

export default function RoadMapCard(params: CardParams): JSX.Element {
  const cardStyle = params.active ? css(styles.cardActive) : css(styles.cardInactive);

  return (
    <div className={`${css(styles.card)} ${cardStyle}`}>
      <div className={css(styles.container)}>
        <h5 className={css(styles.stepNo)}>{params.stepNo}.</h5>
        <h5 className={css(styles.title)}>{params.title}</h5>
      </div>
      <p className={css(styles.description)}>{params.description}</p>
      <ul>
        {params.additionalSteps.map((item, id) => {
          return (
            <li key={id} className={css(styles.listStyle)} dangerouslySetInnerHTML={{ __html: item.replace(/\n/g, '<br/>') }} />
          );
        })}
      </ul>
    </div>
  );
}
