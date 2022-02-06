import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import themeVariables from '../../themeVariables.module.scss';
import RoadMapCard from '../RoadMapCard';
import {roadMapItems} from '../../data/RoadMapItems'
import { STRINGS } from '../../strings';
import MainButton from '../MainButton';

const styles = StyleSheet.create({
  wrapper: {
    width: '60%',
    margin: 'auto',
  },
  socials: {
    margin: '24px',
  },
  update: {
    marginTop: '36px',
  }
})

export default function RoadMapBanner() : JSX.Element{
  return(
      <div className={css(styles.wrapper)}>
        <h2>{STRINGS.roadmap}</h2>
        {roadMapItems.map((item, idx) =>{
          return <RoadMapCard key={idx} title={item.title} stepNo={item.stepNo} active={true} description={item.description} 
          additionalSteps={item.additionalSteps}/>
        })}
        <p className={css(styles.update)}>{STRINGS.roadmapUpdate}</p>
        <div className={css(styles.socials)}>
          <MainButton callToAction={STRINGS.discord.toUpperCase()} primary={false} link=''/>
          <MainButton callToAction={STRINGS.twitter.toUpperCase()} primary={false}  link=''/>
          <MainButton callToAction={STRINGS.instagram.toUpperCase()} primary={false} link=''/>
        </div>
      </div>    
  )
}
