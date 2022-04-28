import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import themeVariables from '../../themeVariables.module.scss';

const styles = StyleSheet.create({
  circle: {
    position: 'relative',
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: themeVariables.whiteColor,
    display: 'block',
    margin: '8px',
    border: `2px solid ${themeVariables.thirdColor}`,
    color: themeVariables.darkColor,
    ':hover': {
      background: themeVariables.secondaryColor,
      color: themeVariables.lightColor
    }
  },
  img: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
  },
  openSea: {
    position: 'relative',
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: themeVariables.primaryColor,
    display: 'block',
    margin: '8px',
    border: `2px solid ${themeVariables.thirdColor}`,
    color: themeVariables.darkColor,
    ':hover': {
      backgroundColor: themeVariables.secondaryColor
    }
  }
});

interface CircleParams {
  img?: string;
  link: string;
  imgLink?: string;
  opensea?: boolean;
}

export default function CircleButton(params: CircleParams): JSX.Element {
  const { link, imgLink, img, opensea = false } = params;
  return (
    <a href={link} target="_blank" rel="noreferrer" className={opensea ? css(styles.openSea) : css(styles.circle) }>
      <img className={css(styles.img)} src={img ? require(`../../images/${img}.svg`).default : imgLink} alt="social-icons" />
    </a>
  );
}
