import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { socialMedia } from '../../data/surgePlatforms';
import themeVariables from '../../themeVariables.module.scss';

const styles = StyleSheet.create({
  flex: {
    display: 'flex'
  },
  icon: {
    marginRight: '25px',
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
    </ul>
  );
}
