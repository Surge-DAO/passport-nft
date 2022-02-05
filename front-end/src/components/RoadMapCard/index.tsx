import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import themeVariables from '../../themeVariables.module.scss';
import {Row, Col} from 'react-bootstrap'

const styles = StyleSheet.create({
  card: {
    width: '60%',
    height: 'auto',
    boxShadow: '5px 10px 18px 5px #fce7e7',
    border: '1px solid #f7c2ca',
    borderRadius: '8px',
    padding: '10px',
    margin: '24px'
  },
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    padding: '24px',
  },
  title: {
    display: 'inline',
    marginLeft: '24px',
  },
  stepNo: {
    display: 'inline',
    color: themeVariables.primaryColor,
  },
  subTitle: {
    textAlign: 'left',
  },
  listStyle: {
    listStyleType: 'circle',
    textAlign: 'left'  
  }

})

interface CardParams {
	title: string,
	stepNo: number,
	active: boolean,
	description: string,
	additionalSteps: string[]
}

export default function RoadMapCard(params: CardParams) : JSX.Element{
  return(
    <div className={css(styles.card)}>
      <div>
        <div className={css(styles.container)}>
          <h3 className={css(styles.stepNo)}>1.</h3>
          <h3 className={css(styles.title)}>Surge Community</h3>
        </div>
        <p className={css(styles.subTitle)}>We are a vibrant Discord community with over 1k+ Surge heroines and allies sharing educational insights with one another and collaborating on fun projects. </p>
        <ul>
          <li className={css(styles.listStyle)}>We are creating educational content for our community</li>
        </ul>
      </div>
    </div>
  )
}
