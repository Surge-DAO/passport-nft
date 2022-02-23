import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import RoadMapCard from '../RoadMapCard';
import { roadMapItems } from '../../data/RoadMapItems';
import { STRINGS } from '../../strings';
import MainButton from '../MainButton';
import { socialMedia } from '../../data/surgePlatforms';

const styles = StyleSheet.create({
  wrapper: {
    width: '60%',
    margin: 'auto',
    '@media (max-width: 768px)': {
      width: '100%',
      margin: '24px',
    } 
  },
  socials: {
    margin: '24px',
    '@media (max-width: 375px) ': {
      width: '100%',
    } 
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
          return <RoadMapCard key={idx} title={item.title} stepNo={item.stepNo} description={item.description} 
          additionalSteps={item.additionalSteps}/>
        })}
        <p className={css(styles.update)}>{STRINGS.roadmapUpdate}</p>
        <div className={css(styles.socials)}>
        {socialMedia.map((platform, idx) => {
            return (
              <MainButton key={idx} callToAction={platform.name.toUpperCase()} primary={false} link={platform.link}/>
              )
          })}
        </div>
      </div>    
  )
}
