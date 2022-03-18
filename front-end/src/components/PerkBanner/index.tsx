import React from 'react';
import themeVariables from '../../themeVariables.module.scss';
import { StyleSheet, css } from 'aphrodite';
import { STRINGS } from '../../strings';
import PerkCard from '../PerkCard';
import { PerkBannerItems } from '../../data/PerkBannerItems';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: themeVariables.lightGreyColor,
    paddingTop: '20px',
    paddingBottom: '40px'
  },
  header: {
    padding: '25px 10px'
  },
  perkContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    '@media (max-width: 768px)': {
      flexWrap: 'wrap'
    }
  },
  perkRow: {
    display: 'flex',
    flexDirection: 'row'
  }
});

export default function PerkBanner(): JSX.Element {
  return (
    <div className={css(styles.wrapper)} id={STRINGS.perks}>

      <div className={css(styles.header)}>
        <h2 className={css(styles.header)}>{STRINGS.passportPerks}</h2>
        <p>{STRINGS.passportPerksDescription}</p>
      </div>

      <div className={`${css(styles.perkContainer)} container`}>
        {PerkBannerItems.map((perk) => {
          return <PerkCard perk={perk} />;
        })}
      </div>

    </div>
  );
}
