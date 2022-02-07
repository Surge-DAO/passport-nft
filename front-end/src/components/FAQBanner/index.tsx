import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import themeVariables from '../../themeVariables.module.scss';
import FAQCard from '../FAQCard';
import { faqItems } from '../../data/FAQItems';
import { STRINGS } from '../../strings';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: themeVariables.lightGreyColor
  },
  container: {
    width: '60%',
    margin: 'auto',
  },
})


export default function FAQBanner() : JSX.Element{
  return(
    <div className={css(styles.wrapper)}>
      <h2>{STRINGS.faq}</h2>
      <div className={css(styles.container)}>
        {faqItems.map((item, id) =>{
          return <FAQCard question={item.question} answer={item.answer} active={true}/>
        })}   
    </div>
    </div>
  )
}