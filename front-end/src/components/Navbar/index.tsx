import React, { useEffect, useState } from 'react';
import MainButton from '../MainButton';
import { StyleSheet, css } from 'aphrodite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import themeVariables from '../../themeVariables.module.scss';
import { STRINGS } from '../../strings';
import MenuItems from './MenuItems';
import SocialMediaIcons from './SocialMediaIcons';

const styles = StyleSheet.create({
  container: {
    display: 'flex'
  },
  leftItems: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: '50%',
    paddingLeft: '28px',
    paddingTop: '15px'
  },
  rightItems: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '50%',
    paddingRight: '2%',
    '@media (min-width: 375px) and (max-width: 768px)': {
      paddingRight: '0px'
    }
  },
  displayNone: {
    display: 'none'
  },
  displayBlock:{
    display: 'block'
  },
  flex: {
    display: 'flex'
  },
  menu: {
    listStyleType: 'none'
  },
  containerMobileMenu: {
    marginBottom: '40px'
  },
  mobileMenu: {
    display: 'none',
    '@media (min-width: 375px) and (max-width: 768px)': {
      height: '100vh',
      backgroundColor: themeVariables.secondaryColor,
      display: 'block',
      margin: '0',
      width: '60vw',
      textAlign: 'left',
      position: 'fixed'
    },
    '@media (min-width: 768px) and (max-width: 1400px)': {
      width: '40vw'
    },
  },
  desktopMenu: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '30vw',
    margin: 'auto',
    paddingTop: '5px',
    '@media (min-width: 375px) and (max-width: 768px)': {
      display: 'none'
    }
  },
  mobileDisplay: {
    display: 'none',
    '@media (min-width: 375px) and (max-width: 768px)': {
      display: 'block'
    }
  },
  logoSize: {
    height: '40px',
    padding: '2%'
  },
  burger: {
    fontSize: '24px',
    textAlign: 'right',
    paddingRight: '28px',
    paddingTop: '25px'
  },
  times: {
    position: 'absolute',
    right: '0px',
    top: '0px',
    fontSize: '24px',
    paddingRight: '28px',
    paddingTop: '25px'
  },
  connectBtn: {
    paddingLeft: '30px',
    margin: 'auto',
    '@media (min-width: 375px) and (max-width: 768px)': {
      paddingTop: '30px'
    }
  },
  padding: {
    paddingTop: '15%',
    paddingRight: '15%',
    '@media (min-width: 375px) and (max-width: 768px)': {
      paddingTop: '10%'
    }
  }
})

export default function Navbar(): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(window.innerWidth);

  let display = open ? css(styles.displayBlock) : css(styles.displayNone);
  const isMobile = width <= 768;

  function handleWindowSizeChange(): void {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  return (
    <div className={css(styles.flex)}>
      <div className={css(styles.leftItems)}>
        <img src={require('../../images/surge-logo.png')} alt="surge logo" className={css(styles.logoSize)}/>
        {!isMobile &&
          <div>
            <MenuItems listStyle={(css(styles.desktopMenu))} />
          </div>
        }
      </div>
      <div className={css(styles.rightItems)}>
        {!isMobile && (
          <div className={css(styles.flex)}>
            <SocialMediaIcons />
            <div className={css(styles.connectBtn)}>
              <MainButton callToAction={STRINGS.connectWallet.toUpperCase()} primary />
            </div>
          </div>
        )}
        {isMobile && (
          <div className={`${open && css(styles.mobileMenu)} ${css(styles.padding)}`}>
            <FontAwesomeIcon icon="bars" onClick={() => setOpen(!open)} className={isMobile && open ? css(styles.displayNone) : ''} />
            <div className={`${display} ${css(styles.menu)}`}>
              <FontAwesomeIcon icon="times" onClick={() => setOpen(!open)} className={`${open && display} ${css(styles.times)}`} />
              <MenuItems listStyle={''} containerStyle={css(styles.containerMobileMenu)} />
              <SocialMediaIcons />
              <div className={css(styles.connectBtn)}>
                <MainButton callToAction={STRINGS.connectWallet.toUpperCase()} primary/>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
