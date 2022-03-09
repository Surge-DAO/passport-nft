import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import themeVariables from '../../themeVariables.module.scss';

import MainButton from '../MainButton';
import { EducationIcon, IRLIcon, DAOsIcon, NFTsIcon, DeFiIcon, GamingIcon } from '../icons';
import { STRINGS } from '../../strings';

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
    flex: 1,
    margin: '0 16px'
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
      return <EducationIcon height={120} width={120} />;
    case 'DAOs':
      return <DAOsIcon height={120} width={120} />;
    case 'NFTs':
      return <NFTsIcon height={120} width={120} />;
    case 'DeFi':
      return <DeFiIcon height={120} width={120} />;
    case 'Gaming':
      return <GamingIcon height={120} width={120} />;
    case 'IRL':
      return <IRLIcon height={120} width={120} />;
  }
};

export default function PerkCard(props: Props): JSX.Element {
  const { perk } = props;
  return (
    <div className={css(styles.container)}>
      <div className={css(styles.iconContainer)}>{getIcon(perk.title)}</div>
      <h2>{perk.title}</h2>
      <div className={css(styles.buttonContainer)}>
        <MainButton callToAction={STRINGS.seePerks} fullWidth />
      </div>
    </div>
  );
}
