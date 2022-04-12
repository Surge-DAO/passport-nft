import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { STRINGS } from '../../strings';
import MainButton from '../MainButton';
import aboutCollectionImg from '../../images/Logo.png';
import themeVariables from '../../themeVariables.module.scss';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: themeVariables.whiteColor,
    paddingBottom: '60px',
    '@media (max-width: 768px)': {
      display: 'flex',
      flexDirection: 'column-reverse',
      justifyContent: 'center',
      alignItems: 'center'
    }
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '80%',
    margin: '0 auto',
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
    '@media (max-width: 1000px)': {
      width: '230px',
      display: 'none'
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
      <div className={css(styles.wrapper)} id={STRINGS.aboutSurge}>
      <div className={css(styles.container)}>
        <div>
          <h2 className={css(styles.title)}>{STRINGS.aboutSurge}</h2>
          <p
            className={css(styles.description)}
            dangerouslySetInnerHTML={{ __html: STRINGS.aboutSurgeDescription.replace(/\n/g, '<br/>') }}
          ></p>
          <div className={css(styles.button)}>
            <MainButton callToAction={STRINGS.learnMoreAboutSurge} primary  action={() => window.open(STRINGS.surgeURL)}/>
          </div>
        </div>
        <img className={css(styles.image)} src={aboutCollectionImg} alt="logo" />
      </div>
    </div>
  );
}
