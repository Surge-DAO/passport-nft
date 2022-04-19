import { StyleSheet, css } from 'aphrodite';
import themeVariables from '../../themeVariables.module.scss';
import { roadMapItems } from '../../data/RoadMapItems';
import { STRINGS } from '../../strings';
import CollapsableRoadmapCard from '../CollapsableRoadmapCard';
import MainButton from '../MainButton';
import { socialMedia } from '../../data/surgePlatforms';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: themeVariables.lightGreyColor
  },
  container: {
    width: '60%',
    margin: 'auto',
    padding: '24px',
    '@media (max-width: 768px)': {
      width: '100%'
    }
  },
  title: {
    paddingTop: '48px'
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

export default function CollapsableRoadmapBanner(): JSX.Element {
  return (
    <div className={css(styles.wrapper)} id={STRINGS.roadmap}>
      <h2 className={css(styles.title)}>{STRINGS.roadmap}</h2>
      <div className={css(styles.container)}>
        {roadMapItems.map((item, id) => {
          return <CollapsableRoadmapCard key={id} title={item.title} description={item.description} stepNo ={item.stepNo} additionalSteps={item.additionalSteps} active={item.active} lastLine={item.lastLine} />;
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
    </div>
  );
}
