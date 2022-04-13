import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Row, Col } from 'react-bootstrap';
import themeVariables from '../../themeVariables.module.scss';
import { Partners } from '../../data/PartnersItems';

const styles = StyleSheet.create({
  container: {
    padding: '0 10px 40px 10px',
    backgroundColor: themeVariables.whiteColor,
    display: 'flex',
    justifyContent: 'center'
  },
  logos: {
    width: '150px',
    marginTop: '20px',
    cursor: 'pointer',
    '@media (max-width: 768px)': {
      padding: '0 20px'    
    }
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    paddingTop: '48px'
  }
});

export default function PartnersBanner(): JSX.Element {
  return (
    <div>
      <h2 className={css(styles.title)}>Our Partners </h2>
        <div className={css(styles.container)}>
          <Row xs={2} sm={2} md='auto' lg='auto' className='justify-content-md-center'>
            {Partners.map((partner, idx) => (
              <Col key={idx}>
                <div className={css(styles.container)}>
                  <img className={css(styles.logos)} title={partner.name} src={process.env.PUBLIC_URL + partner.logo} alt="partners" onClick={() => window.open(partner.link)}/>
                </div>
              </Col>
            ))}
        </Row>
      </div>
    </div>
    
  );
}
