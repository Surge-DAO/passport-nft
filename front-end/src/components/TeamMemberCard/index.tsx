import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { TeamMember } from '../../data/TeamMembers';
import Card from 'react-bootstrap/Card';
import themeVariables from '../../themeVariables.module.scss';

const styles = StyleSheet.create({
  card: {
    marginBottom: '20px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.16)',
    border: '2px solid #F7C2CA',
    display: 'flex'
  },
  cardText: {
    alignSelf: 'flex-end',
    paddingBottom: '0'
  },
  imgOverlay: {
    display: 'flex',
    background: `linear-gradient(180deg, rgba(251, 246, 249, 0) 35%, ${themeVariables.whiteColor} 100%)`,
    cursor: 'pointer'
  },
  role: {
    textTransform: 'uppercase',
    color: themeVariables.primaryColor,
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '19px',
    '@media (max-width: 1199px)': {
      fontSize: '5px'
    }
  },
  name: {
    '@media (max-width: 1199px)': {
      fontSize: '10px',
      marginBottom: '0'
    }
  }
});

interface TeamMemberProps {
  member: TeamMember;
}

export default function TeamMemberCard(props: TeamMemberProps): JSX.Element {
  const { member } = props;

  return (
    <Card className={css(styles.card)} onClick={() => window.open(member.link)}>
      <Card.Img src={process.env.PUBLIC_URL + member.image}/>
      <Card.ImgOverlay className={css(styles.imgOverlay)}>
        <Card.Body className={css(styles.cardText)}>
          <Card.Title className={css(styles.name)}>{member.name}</Card.Title>
          <Card.Text className={css(styles.role)}>{member.role}</Card.Text>
        </Card.Body>
      </Card.ImgOverlay>
    </Card>
  );
}
