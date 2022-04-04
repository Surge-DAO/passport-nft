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
    paddingTop: '40px',
    '@media (max-width: 768px)': {
      width: '100%'
    }
  },
  socials: {
    marginTop: '34px',
    marginBottom: '60px',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    '@media (max-width: 375px)': {
      width: '100%'
    }
  },
  update: {
    marginTop: '36px'
  },
  socialItem: {
    margin: '10px'
  }
});

export default function RoadMapBanner(): JSX.Element {
  return (
    <div className={css(styles.wrapper)} id={STRINGS.roadmap}>
      <h2>{STRINGS.roadmap}</h2>
      {roadMapItems.map((item, idx) => {
        return (
          <RoadMapCard
            key={idx}
            title={item.title}
            stepNo={item.stepNo}
            description={item.description}
            additionalSteps={item.additionalSteps}
            active={item.active}
          />
        );
      })}
      <p className={css(styles.update)}>{STRINGS.roadmapUpdate}</p>
      <div className={css(styles.socials)}>
        {socialMedia.map((platform, idx) => {
          return (
            <div className={css(styles.socialItem)}>
              <MainButton key={idx} callToAction={platform.name.toUpperCase()} action={() => window.open(platform.link)} primary />
            </div>
          );
        })}
      </div>
    </div>
  );
}
