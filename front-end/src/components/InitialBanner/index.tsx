import MainButton from '../MainButton';
import { StyleSheet, css } from 'aphrodite';
import gradientBackground from '../../images/gradient-background.png';
import { STRINGS } from '../../strings';
import Image from 'react-bootstrap/Image';

const styles = StyleSheet.create({
  banner: {
    height: '80vh',
    width: '100vw',
    textAlign: 'center',
    backgroundImage: `url(${gradientBackground})`,
    backgroundSize: 'cover',
    paddingVertical: '5%',
    overflow: 'hidden',
  },
  title: {
    paddingTop: '5%',
    paddingBottom: '5%',
    paddingLeft: '10%',
    paddingRight: '10%',
  },
  bannerFooter: {
    paddingTop: '3%',
    paddingBottom: '3%',
  },
});

export default function InitialComponent(): JSX.Element {
  return (
    <div className={css(styles.banner)}>
      <h1 className={css(styles.title)}>Surge Passport NFT</h1>
      <Image src={require('../../images/nft-carousel.png')} alt="nft-sneak-peek" />
      <div className={css(styles.bannerFooter)}>
        <MainButton callToAction={STRINGS.clickToMint} primary />
        <div>
          <p>
            {STRINGS.whatIs}
            <span>
              <strong> {STRINGS.minting}</strong>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
