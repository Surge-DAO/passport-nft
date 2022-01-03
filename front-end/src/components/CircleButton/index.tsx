import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
    circle: {
      position: 'relative',
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      background: 'white',
      display: 'block'
    },
    img: {
        position: 'absolute',
        left : '50%',
        top : '50%',
        transform: 'translate(-50%, -50%)'
      },
},
)

interface ICircle {
	img: string;
	link: string;
}


export default function CircleButton(circle : ICircle) : JSX.Element {
    return (
        <a href={circle.link} className={`${css(styles.circle)}`}>
            <img className={`${css(styles.img)}`} src={require(`../../images/${circle.img}`)} alt='social-icons'/>  
        </a>
      
    )
}