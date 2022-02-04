import React from "react";
import { StyleSheet, css } from "aphrodite";
import { STRINGS } from '../../strings';
import themeVariables from '../../themeVariables.module.scss';
import CircleButton from "../CircleButton";

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between', 
    padding: '24px',
    backgroundColor: themeVariables.thirdColor,
    '@media (max-width: 768px)': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    } 
  },  
  image: {
    verticalAlign: 'middle',
    '@media (max-width: 379)': {
      width: '60%',
      margin: 'auto'
    }
  },
  tagline: {
    marginLeft: '18px',
    display: 'inline',
    '@media (max-width: 379px)': {
      display: 'block',
        padding: '0 0 20px 0',
        textAlign: 'center'
    } 
  },
  socials: {
    display: 'flex',
    flexDirection: 'row'
  }
})

 export default function Footer(): JSX.Element {
    return (
      <div className={css(styles.container)}>
          <div>
            <img className={css(styles.image)} src={require('../../images/surge-logo.svg').default} width='100px' height='60px'  alt='logo'/>
            <p className={css(styles.tagline)}>{STRINGS.securingWomen}</p>
          </div>
          <div className={css(styles.socials)}>
            <CircleButton link="https://discord.com/invite/bE6TTrAyNy" img="discord"/>
            <CircleButton link="https://twitter.com/surge_women" img="twitter"/>
            <CircleButton link="https://www.instagram.com/surge_women/" img="instagram"/>
            <CircleButton link="https://opensea.io/" img="opensea"/>
          </div>      
      </div>
  )
 }
