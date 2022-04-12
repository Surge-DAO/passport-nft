import { useEffect, useState } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Row, Col } from 'react-bootstrap';
import { Partners } from '../../data/PassportItems';
import passportGif from '../../images/surge-passport.gif'

const styles = StyleSheet.create({
  image: {
    width: '272px',
    marginTop: '20px'
  },
  gif: {
    width: '40%',
    margin: '0 auto'
  }
});

export default function PassportBanner(): JSX.Element {
  const [width, setWidth] = useState(0)

  const getWindowSize = () => {
    setWidth(window.innerWidth);
  }

  useEffect(() =>{
    window.onresize = () => {
      getWindowSize()
    }
    getWindowSize()
  },[])
   
  return (
    <div>
        <Row lg='5' md='3' sm='2'className="justify-content-md-center">
        {width <= 990 ? 
        <img className={css(styles.gif)} src={passportGif} alt="passport"/> : 
        Partners.map((passport, idx) => (
          <Col key={idx} >
            <img className={css(styles.image)} src={process.env.PUBLIC_URL + passport.image} alt="passport"/>
          </Col>
        ))}
      </Row>
    </div>
  );
}
