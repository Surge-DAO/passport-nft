import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import themeVariables from '../../themeVariables.module.scss';

const styles = StyleSheet.create({
  circle: {
    position: 'relative',
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    background: themeVariables.white,
    display: 'block',
    margin: '8px'
  },
  img: {
    position: 'absolute',
    left : '50%',
    top : '50%',
    transform: 'translate(-50%, -50%)'
  }
})

interface CircleParams {
	img: string;
	link: string;
}

export default function CircleButton(params: CircleParams) : JSX.Element {
  return (
    <a href={params.link} className={css(styles.circle)}>
        <img className={css(styles.img)} src={require(`../../images/${params.img}`)} alt='social-icons'/>  
    </a>
  )
}
