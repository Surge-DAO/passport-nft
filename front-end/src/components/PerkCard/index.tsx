import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import themeVariables from '../../themeVariables.module.scss';
import { STRINGS } from '../../strings';
import { EducationIcon, IRLIcon, DAOsIcon, NFTsIcon, DeFiIcon } from '../icons';
import MainButton from '../MainButton';

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
    paddingLeft: '15px',
    paddingRight: '15px',
    marginTop: '10px',
    marginBottom: '15px'
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
      return <EducationIcon height={80} width={80} />;
    case 'Web3 Tooling':
      return <DAOsIcon height={80} width={80} />;
    case 'NFTs':
      return <NFTsIcon height={80} width={80} />;
    case 'Finance':
      return <DeFiIcon height={80} width={80} />;
    case 'IRL':
      return <IRLIcon height={80} width={80} />;
  }
};

export default function PerkCard(props: Props): JSX.Element {
  const { perk } = props;

  return (
    <div className={css(styles.container)}>
      <div className={css(styles.iconContainer)}>{getIcon(perk.title)}</div>
      <h4>{perk.title}</h4>
      <div className={css(styles.buttonContainer)}>
        <MainButton callToAction={STRINGS.seePerks} fullWidth />
      </div>
    </div>
  );
}
