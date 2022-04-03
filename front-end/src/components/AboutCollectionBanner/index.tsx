import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { STRINGS } from '../../strings';
import aboutCollectionImg from '../../images/about-collection.png';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '80vw',
    margin: '70px auto',
    '@media (max-width: 1100px)': {
      display: 'flex',
      flexDirection: 'column-reverse',
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: '50px'
    }
  },
  image: {
    width: '290px',
    '@media (max-width: 768px)': {
      width: '270px'
    }
  },
  title: {
    textAlign: 'left',
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
  );
}
