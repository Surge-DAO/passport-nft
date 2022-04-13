import React from 'react';
import themeVariables from '../../themeVariables.module.scss';
import { StyleSheet, css } from 'aphrodite';
import {Row} from 'react-bootstrap'
import { STRINGS } from '../../strings';
import PerkCard from '../PerkCard';
import { PerkBannerItems } from '../../data/PerkBannerItems';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: themeVariables.whiteColor,
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
  },
  description: {
    '@media (max-width: 768px)': {
      padding: '0 20px'
    }
  }
});

export default function PerkBanner(): JSX.Element {
  return (
    <div className={css(styles.wrapper)} id={STRINGS.perks}>

      <div className={css(styles.header)}>
        <h2 className={css(styles.header)}>{STRINGS.passportPerks}</h2>
        <p className={css(styles.description)}>{STRINGS.passportPerksDescription}</p>
      </div>

      <div className={`${css(styles.perkContainer)} container`}>
        <Row xs={2} sm={2} md={3} lg='auto' className='justify-content-md-center'>
          {PerkBannerItems.map((perk) => {
            return <PerkCard perk={perk} />;
          })}
        </Row>
      </div>

    </div>
  );
}
