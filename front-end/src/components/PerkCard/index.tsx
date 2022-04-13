import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import themeVariables from '../../themeVariables.module.scss';
import { STRINGS } from '../../strings';
import MainButton from '../MainButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobeAmericas, faGraduationCap, faPiggyBank, faRobot, faRocket } from '@fortawesome/free-solid-svg-icons';
import { faPhoenixFramework } from '@fortawesome/free-brands-svg-icons';

export interface Perk {
  title: string;
  description: string;
  benefits: string[];
}

type Props = {
  perk: Perk;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: `${themeVariables.whiteColor}`,
    border: `2px solid ${themeVariables.thirdColor}`,
    borderRadius: '8px',
    boxShadow: `1px 1px 10px 1px rgba(43, 43, 43, 0.3)`,
    paddingLeft: '5px',
    paddingRight: '5px',
    marginTop: '10px',
    marginBottom: '15px',
    marginRight: '5px',
    '@media (max-width: 768px)': {
      marginRight: '0',
      paddingLeft: '0',
      paddingRight: '0',
    }
  },
  iconContainer: {
    marginTop: '12px'
  },
  buttonContainer: {
    borderRadius: '24px',
    margin: '24px 24px'
  }
});

const getIcon = (title: string) => {
  switch (title) {
    case 'Education':
      return <FontAwesomeIcon icon={faGraduationCap} size='4x' color='#f7c2ca'/>;
    case 'Tools':
      return <FontAwesomeIcon icon={faRocket} size='4x' color='#f7c2ca'/>;
    case 'NFTs':
      return <FontAwesomeIcon icon={faPhoenixFramework} size='4x' color='#f7c2ca'/>;
    case 'Finance':
      return <FontAwesomeIcon icon={faPiggyBank} size='4x' color='#f7c2ca'/>;
    case 'IRL':
      return <FontAwesomeIcon icon={faGlobeAmericas} size='4x' color='#f7c2ca'/>;
    case 'Developer':
      return <FontAwesomeIcon icon={faRobot} size='4x' color='#f7c2ca'/>;
  }
};

export default function PerkCard(props: Props): JSX.Element {
  const { perk } = props;

  return (
    <div className={css(styles.container)}>
      <div className={css(styles.iconContainer)}>{getIcon(perk.title)}</div>
      <h4>{perk.title}</h4>
      <div className={css(styles.buttonContainer)}>
        <MainButton callToAction={STRINGS.seePerks} fullWidth link="https://perks.surgewomen.io" />
      </div>
    </div>
  );
}
