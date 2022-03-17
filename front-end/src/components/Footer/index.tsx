import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { STRINGS } from '../../strings';
import CircleButton from '../CircleButton';
import footerBackground from '../../images/footer-background.svg';
import { socialMedia } from '../../data/surgePlatforms';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '24px',
    backgroundImage: `url(${footerBackground})`,
    '@media (max-width: 768px)': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }
  },
  image: {
    verticalAlign: 'middle'
  },
  tagline: {
    marginLeft: '18px',
    display: 'inline',
    paddingTop: '20px',
    '@media (max-width: 379px)': {
      display: 'block',
      padding: '0 0 20px 0',
      textAlign: 'center'
    }
  },
  socials: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '24px'
  }
});

export default function Footer(): JSX.Element {
  return (
    <div className={css(styles.container)}>
      <div className={css(styles.container)}>
        <img
          className={css(styles.image)}
          src={require('../../images/surge-logo.svg').default}
          width="100px"
          height="60px"
          alt="logo"
        />
        <p className={css(styles.tagline)}>{STRINGS.securingWomen}</p>
      </div>
      <div className={css(styles.socials)}>
        {socialMedia.map((platform, idx) => {
          return <CircleButton link={platform.link} key={idx} img={platform.name} />;
        })}
      </div>
    </div>
  );
}
