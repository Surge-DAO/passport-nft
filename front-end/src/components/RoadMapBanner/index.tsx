import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import themeVariables from '../../themeVariables.module.scss';
import RoadMapCard from '../RoadMapCard';

const styles = StyleSheet.create({
  card: {
    width: '200px',
    boxShadow: '1px 1px #fce7e7'
  }
})


export default function RoadMapBanner() : JSX.Element{
  return(
    <RoadMapCard title='Surge Community' stepNo={1} active={true} description={"We are a vibrant Discord community with over 1k+ Surge heroines and allies sharing educational insights with one another and collaborating on fun projects."} 
    additionalSteps={["We are creating", "We are creating"]}/>
  )
}