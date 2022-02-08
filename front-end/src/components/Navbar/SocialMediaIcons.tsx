import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { socialMedia } from '../../data/surgePlatforms';

const styles = StyleSheet.create({
  listInline: {
    display: 'flex',
    margin: 'auto'
  },
  icon: {
    marginRight: '25px',
    color: 'black'
  }
})

export default function SocialMediaIcons(): JSX.Element {
  return (
    <ul className={css(styles.listInline)}>
      {socialMedia.map((platform, idx) => {
        return (
          <li key={idx} className={css(styles.icon)}>
            <a href={platform.link}>
              <FontAwesomeIcon icon={['fab', platform.name]} />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
