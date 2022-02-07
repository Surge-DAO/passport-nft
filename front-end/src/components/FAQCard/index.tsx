import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import themeVariables from '../../themeVariables.module.scss';
import {Accordion, Card} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

const styles = StyleSheet.create({
  card: {
    boxShadow: '5px 10px 18px 5px #fce7e7',
    border: '1px solid #f7c2ca',
    borderRadius: '8px',
    padding: '10px',
    margin: '24px',
    backgroundColor: themeVariables.whiteColor
  },
  questionSection: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  answerSection: {
    display: 'none'
  },
  line: {
    border: '1px solid #f7c2ca',
  },
  answer:{
    marginLeft: '24px',
  },
  displayNone: {
    display: 'none'
  },
  displayBlock:{
    display: 'block'
  },
  
})

export interface FAQParams {
	question: string;
	answer: string;
	active?: boolean;
}
  
export default function FAQCard(params: FAQParams) : JSX.Element{
  const [open, setOpen] = useState<boolean>(false);
  let display = open ? css(styles.answerSection) && css(styles.displayBlock) : css(styles.displayNone);

  const openAnswer = () =>{
    setOpen(!open)
    css(styles.line) && css(styles.answer)
  }

  return(
    
       <div className={css(styles.card)} onClick={() => openAnswer()}>
                {open ?  <div className={css(styles.answerSection)}>
           <hr className={css(styles.line)} />
           <p className={css(styles.answer)}>{params.answer}</p>
         </div>  :  <div className={css(styles.questionSection)}>
           <h3>{params.question}</h3>
           <FontAwesomeIcon icon='times' onClick={() => setOpen(open)} className={`${open && display}`}/>
         </div> }

         
       </div>
  
   
  )
}