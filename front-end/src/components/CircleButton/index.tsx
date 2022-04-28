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
  }
});

interface CircleParams {
  img?: string;
  link: string;
  imgLink?: string;
  style?: string;
}

export default function CircleButton(params: CircleParams): JSX.Element {
  return (
    <a href={params.link} target="_blank" rel="noreferrer" className={`${css(styles.circle)} ${params.style}`}>
      <img className={css(styles.img)} src={params.img ? require(`../../images/${params.img}.svg`).default : params.imgLink} alt="social-icons" />
    </a>
  );
}
