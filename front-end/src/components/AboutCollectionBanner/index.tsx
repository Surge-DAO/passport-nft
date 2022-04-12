import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { STRINGS } from '../../strings';
import aboutCollectionImg from '../../images/passport.gif';
import themeVariables from '../../themeVariables.module.scss';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: themeVariables.lightGreyColor,
    padding: '20px 0'
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '80vw',
    margin: '70px auto',
    '@media (max-width: 1100px)': {
      display: 'flex',
      flexDirection: 'column-reverse',
      justifyContent: 'center',
      alignItems: 'center'
    }
  },
  image: {
    width: '500px',
    marginTop: '24px',
    '@media (max-width: 768px)': {
      width: '80%',
      margin: 'auto'
    }
  },
  title: {
    textAlign: 'left',
    marginBottom: '24px',
    '@media (max-width: 768px)': {
      padding: '0 0 20px 0',
      textAlign: 'center'
    }
  },
  description: {
    fontSize: '18px',
    textAlign: 'left',
    width: '85%'
  },
  text: {
    width: '85%'
  }
});

export default function AboutCollectionBanner(): JSX.Element {
  return (
    <div className={css(styles.wrapper)}>
      <div className={css(styles.container)}>
        <div className={css(styles.text)}>
          <h2 className={css(styles.title)}>{STRINGS.aboutCollection}</h2>
          <p
            className={css(styles.description)}
            dangerouslySetInnerHTML={{ __html: STRINGS.aboutDescription.replace(/\n/g, '<br/>') }}
          ></p>
        </div>
        <img className={css(styles.image)} src={aboutCollectionImg} alt="collection" />
      </div>
    </div>
  );
}
