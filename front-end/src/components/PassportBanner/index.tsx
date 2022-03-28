import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import {Row, Col} from 'react-bootstrap'
import { Partners } from '../../data/PassportItems';

const styles = StyleSheet.create({
  image: {
    width: '272px',
    height: '272px',
    marginTop: '20px'
  }
});

export default function PassportBanner(): JSX.Element {
  return (
    <div>
        <Row lg='5' md='3' sm='2'className="justify-content-md-center">
        {Partners.map((passport, idx) => (
          <Col key={idx} >
            <img className={css(styles.image)} src={process.env.PUBLIC_URL + passport.image} alt="paasport"/>
          </Col>
        ))}
      </Row>
    </div>
  );
}
