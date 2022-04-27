import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { STRINGS } from '../../strings';
import CircleButton from '../CircleButton';
import themeVariables from '../../themeVariables.module.scss';
import { socialMedia } from '../../data/surgePlatforms';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: themeVariables.secondaryColor,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '24px',
    height: 'auto',
    '@media (min-width: 320px) and (max-width: 768px)': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }
  },
  container: {
    verticalAlign: 'middle',
    marginTop: '24px',
    '@media (max-width: 492px)': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '8px'
    }
  },
  image: {
    verticalAlign: 'middle',
    cursor: 'pointer'
  },
  tagline: {
    marginLeft: '18px',
    display: 'inline',
    padding: '24px',
    '@media (max-width: 492px)': {
     fontSize: '16px'
    }
  },
  socials: {
    display: 'flex',
    flexDirection: 'row',
    padding: '24px',
    '@media (max-width: 768px)': {
      paddingTop: '8px'
     }
  },
  policy: {
    verticalAlign: 'middle',
    marginTop: '24px',
    padding: '24px',
    '@media (max-width: 768px)': {
      marginTop: '0',
      fontSize: '16px',
      paddingTop: '8px'
     }
  },
});

export default function Footer(): JSX.Element {
  return (
    <div className={css(styles.wrapper)}>
      <div className={css(styles.container)}>
        <img
          className={css(styles.image)}
          src={require('../../images/surge-logo.svg').default}
          width="100px"
          height="60px"
          alt="logo"
          onClick={() => window.open(STRINGS.surgeURL)}
        />
        <p className={css(styles.tagline)}>{STRINGS.securingWomen}</p>
      </div>      
      <div className={css(styles.policy)}>
        <a href ={STRINGS.termsUrl} target='_blank' rel='noreferrer'>{STRINGS.terms}</a>
      </div>
      <div className={css(styles.socials)}>
        {socialMedia.map((platform, idx) => {
          return <CircleButton link={platform.link} key={idx} img={platform.name} />;
        })}
      </div>
    </div>
  );
}
