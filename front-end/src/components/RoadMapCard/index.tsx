import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import themeVariables from '../../themeVariables.module.scss';

const styles = StyleSheet.create({
  card: {
    boxShadow: `1px 1px 8px ${themeVariables.secondaryColor}`,
    border: `1px solid ${themeVariables.secondaryColor}`,
    borderRadius: '8px',
    padding: '10px',
    margin: '24px' 
  },
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    padding: '24px'
  },
  title: {
    display: 'inline',
    marginLeft: '24px'
  },
  stepNo: {
    display: 'inline',
    color: themeVariables.primaryColor
  },
  description: {
    textAlign: 'left',
    marginLeft: '24px',
    marginRight: '24px',
    lineHeight: '24px'
  },
  listStyle: {
    listStyleType: 'disc',
    listStylePosition: 'inside',
    textAlign: 'left',
    margin: '10px',
    fontSize: '18px'
  }
})

export interface CardParams {
	title: string,
	stepNo: number,
	description: string,
	additionalSteps: string[]
}

export default function RoadMapCard(params: CardParams) : JSX.Element{
  return(
    <div className={css(styles.card)}>
      <div className={css(styles.container)}>
        <h3 className={css(styles.stepNo)}>{params.stepNo}.</h3>
        <h3 className={css(styles.title)}>{params.title}</h3>
      </div>
        <p className={css(styles.description)}>{params.description}</p>     
        <ul>
          {params.additionalSteps.map((item, id) =>{
            return <li key={id} className={css(styles.listStyle)}>{item}</li>
          })}
        </ul>
    </div>  
  )
}
