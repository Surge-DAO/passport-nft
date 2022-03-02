import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { STRINGS } from '../../strings';
import themeVariables from '../../themeVariables.module.scss';
import MainButton from '../MainButton';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '80%',
    margin: 'auto',
    '@media (max-width: 768px)': {
      display: 'flex',
      flexDirection: 'column-reverse',
      justifyContent: 'center',
      alignItems: 'center'
    }
  },
  wrapper: {
    backgroundColor: themeVariables.lightGreyColor,
    paddingBottom: '40px',
    '@media (max-width: 768px)': {
      display: 'flex',
      flexDirection: 'column-reverse',
      justifyContent: 'center',
      alignItems: 'center'
    }
  },
  image: {
    width: '335px',
    padding: '40px 0',
    '@media (max-width: 768px)': {
      width: '230px'
    }
  },
  title: {
    textAlign: 'left',
    padding: '60px 0 20px 0',
    '@media (max-width: 768px)': {
      padding: '0 0 20px 0',
      textAlign: 'center'
    }
  },
  button: {
    textAlign: 'left',
    marginTop: '40px',
    '@media (max-width: 768px)': {
      padding: '20px 0 20px 0',
      textAlign: 'center'
    }
  },
  description: {
    fontSize: '18px',
    textAlign: 'left',
    width: '90%'
  }
});

export default function AboutSurgeBanner(): JSX.Element {
  return (
    <div className={css(styles.wrapper)}>
      <div className={css(styles.container)}>
        <div>
          <h2 className={css(styles.title)}>{STRINGS.aboutSurge}</h2>
          <p
            className={css(styles.description)}
            dangerouslySetInnerHTML={{ __html: STRINGS.aboutSurgeDescription.replace(/\n/g, '<br/>') }}
          ></p>
          <div className={css(styles.button)}>
            <MainButton callToAction={STRINGS.learnMoreAboutSurge} primary />
          </div>
        </div>
        <img className={css(styles.image)} src={require('../../images/Logo.png')} alt="logo" />
      </div>
    </div>
  );
}
