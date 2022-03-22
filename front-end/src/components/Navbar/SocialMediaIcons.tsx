import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { socialMedia } from '../../data/surgePlatforms';

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
  }
});

export default function SocialMediaIcons(): JSX.Element {
  return (
    <ul className={css(styles.flex)}>
      {socialMedia.map((platform, idx) => {
        return (
          <li key={idx} className={css(styles.icon)}>
            <a href={platform.link}>
              <FontAwesomeIcon icon={['fab', platform.name]} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
