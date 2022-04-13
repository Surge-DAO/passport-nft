import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import TeamMemberCard from '../TeamMemberCard';
import { teamMembers } from '../../data/TeamMembers';
import { STRINGS } from '../../strings';
import themeVariables from '../../themeVariables.module.scss';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: themeVariables.lightGreyColor,
    paddingBottom: '24px'
  },
  cards: {
    marginBottom: '5%'
  },
  title: {
    textTransform: 'capitalize',
    paddingTop: '5%',
    paddingBottom: '5%'
  }
});

export default function TeamMembersBanner(): JSX.Element {
  return (
    <div className={css(styles.wrapper)}>
      <Container id={STRINGS.team}>
        <h2 className={css(styles.title)}>{STRINGS.team}</h2>
        <Row className={css(styles.cards)} xs={2} sm={2} md={3} lg={4}>
          {teamMembers.map((member, idx) => (
            <Col key={idx}>
              <TeamMemberCard member={member} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
