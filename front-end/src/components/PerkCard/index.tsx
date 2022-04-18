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
    borderRadius: '8px',
    boxShadow: `1px 1px 10px 1px rgba(43, 43, 43, 0.3)`,
    paddingLeft: '5px',
    paddingRight: '5px',
    marginTop: '10px',
    marginBottom: '15px',
    marginRight: '20px',
    '@media (max-width: 768px)': {
      marginLeft: '16px',
      marginRight: '2px',
      paddingLeft: '0',
      paddingRight: '0'
    }
  },
  iconContainer: {
    marginTop: '12px',
    paddingTop: '25px'
  },
  buttonContainer: {
    borderRadius: '24px',
    margin: '24px 24px',
    '@media (max-width: 768px)': {
      margin: '12px 12px'
    }
  },
  text: {
    '@media (max-width: 768px)': {
      fontSize: ' 14px'
    }
  }
});

const getIcon = (title: string) => {
  switch (title) {
    case 'Education':
      return <FontAwesomeIcon icon={faGraduationCap} size='4x' color='#f7c2ca'/>;
    case 'Web3 Tools':
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
      <h4 className={css(styles.text)}>{perk.title}</h4>
      <div className={css(styles.buttonContainer)}>
        <MainButton callToAction={STRINGS.seePerks} customStyle={css(styles.text)} fullWidth link="https://perks.surgewomen.io" />
      </div>
    </div>
  );
}
