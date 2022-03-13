import React from 'react';
import themeVariables from '../../themeVariables.module.scss';
import { StyleSheet, css } from 'aphrodite';
import { STRINGS } from '../../strings';
import PerkCard from '../PerkCard';
import { PerkBannerItems } from '../../data/PerkBannerItems';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: themeVariables.lightGreyColor
  },
  header: {
    padding: '25px 0px'
  },
  perkContainer: {
    padding: '25px 50px 50px 50px'
  },
  perkRow: {
    display: 'flex',
    flexDirection: 'row',
    margin: '2% 10%'
  }
});

export default function PerkBanner(): JSX.Element {
  return (
    <div className={css(styles.wrapper)} id={STRINGS.perks}>
      <h2 className={css(styles.header)}>{STRINGS.passportPerks}</h2>
      <p>{STRINGS.passportPerksDescription}</p>

      <div className={css(styles.perkContainer)}>
        <div className={css(styles.perkRow)}>
          <PerkCard perk={PerkBannerItems[0]} />
          <PerkCard perk={PerkBannerItems[1]} />
          <PerkCard perk={PerkBannerItems[2]} />
        </div>
        <div className={css(styles.perkRow)}>
          <PerkCard perk={PerkBannerItems[3]} />
          <PerkCard perk={PerkBannerItems[4]} />
          <PerkCard perk={PerkBannerItems[5]} />
        </div>
      </div>
    </div>
  );
}
