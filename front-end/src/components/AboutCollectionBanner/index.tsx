import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { STRINGS } from '../../strings';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    width : '80%',
    margin: 'auto',
    '@media (max-width: 1100px)': {
        display: 'flex',
        flexDirection: 'column-reverse',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: '50px'
    }
  },
  image: {
    width: '371px',
    padding : '7%',
    '@media (max-width: 768px)': {
      width: '270px',
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
  description: {
    fontSize: '18px',
    textAlign : 'left'
  },
  text: {
    width: '85%'
  }
})

 export default function AboutCollectionBanner(): JSX.Element {
    return (
      <div className={css(styles.container)}>
        <div className={css(styles.text)}>
          <h2 className={css(styles.title)}>{STRINGS.aboutCollection}</h2>
          <p className={css(styles.description)} dangerouslySetInnerHTML={{ __html: STRINGS.aboutDescription.replace(/\n/g, '<br/>')}}></p>
        </div>
        <img className={css(styles.image)} src={require('../../images/about-collection.png')} alt='collection'/>
      </div>
  )
 }
