import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import TeamMemberCard from '../TeamMemberCard';
import { teamMembers } from '../../data/TeamMembers';
import { STRINGS } from '../../strings';

const styles = StyleSheet.create({
  container: {
    height: '100vh'
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
    <Container>
      <h2 className={css(styles.title)}>{STRINGS.team}</h2>
      <Row className={css(styles.cards)} xs="auto" sm={3} md={4} lg={5}>
        {teamMembers.map((member, idx) => (
          <Col key={idx}>
            <TeamMemberCard member={member} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
