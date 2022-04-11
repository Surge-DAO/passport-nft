import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Row, Col } from 'react-bootstrap';
import themeVariables from '../../themeVariables.module.scss';
import { Partners } from '../../data/PartnersItems';

const styles = StyleSheet.create({
  container: {
    padding: '20px 0',
    backgroundColor: themeVariables.whiteColor,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center'
  },
  logos: {
    width: '120px',
    marginTop: '20px',
    cursor: 'pointer'
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default function PartnersBanner(): JSX.Element {
  return (
    <div className={css(styles.container)}>
        <Row>
          {Partners.map((partner, idx) => (
            <Col key={idx}>
              <div className={css(styles.container)}>
                <img className={css(styles.logos)} title={partner.name} src={process.env.PUBLIC_URL + partner.logo} alt="partners" onClick={() => window.open(partner.link)}/>
              </div>
            </Col>
          ))}
      </Row>
    </div>
  );
}
