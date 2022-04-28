import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { socialMedia } from '../../data/surgePlatforms';
import themeVariables from '../../themeVariables.module.scss';
import openSeaBlackLogo from '../../images/open-sea-black.png';

const styles = StyleSheet.create({
  flex: {
    display: 'flex',
    justifyContent: 'center'
  },
  icon: {
    marginRight: '25px',
    color: 'black',
    paddingTop: '20px',
    '@media (min-width: 375px) and (max-width: 952px)': {
      paddingTop: '35px'
    }
  },
  iconColor: {
    color: 'black',
    ':hover': {
      color: themeVariables.secondaryColor
    }
  },
  openSea: {
    width: '19px',
    ':hover': {
      width: '23px'
    }
  }
});

export default function SocialMediaIcons(): JSX.Element {
  return (
    <ul className={css(styles.flex)}>
      {socialMedia.map((platform, idx) => {
        return (
          <li key={idx} className={css(styles.icon)}>
            <a href={platform.link} className={css(styles.iconColor)}>
              <FontAwesomeIcon icon={['fab', platform.name]} />
            </a>
          </li>
        );
      })}
      <li className={css(styles.icon)}>
        <a href="https://opensea.io/collection/surge-passport">
          <img src={openSeaBlackLogo} alt="OpenSea" className={css(styles.openSea)}/>
        </a>
      </li>
    </ul>
  );
}
