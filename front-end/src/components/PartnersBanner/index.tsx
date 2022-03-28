import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import themeVariables from '../../themeVariables.module.scss';
import {Row, Col} from 'react-bootstrap'
import { Partners } from '../../data/PartnersItems';

const styles = StyleSheet.create({
  container: {
    padding: '60px',
    backgroundColor: themeVariables.lightGreyColor
  },
  logos: {
    width: '100px',
    height: '100px',
    marginTop: '20px',
    cursor: 'pointer'
  }
});

export default function PartnersBanner(): JSX.Element {
  return (
    <div className={css(styles.container)}>
        <Row>
        {Partners.map((partner, idx) => (
          <Col key={idx}>
            <img className={css(styles.logos)} src={process.env.PUBLIC_URL + partner.logo} alt="partners" onClick={() => window.open(partner.link)}/>
          </Col>
        ))}
      </Row>
    </div>
  );
}
