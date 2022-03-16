import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import themeVariables from '../../themeVariables.module.scss';
import { Button } from 'react-bootstrap'

const styles = StyleSheet.create({
  circle: {
    position: 'relative',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    color: 'black',
    fontSize: '24px',
    boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.16)',
    backgroundColor: themeVariables.whiteColor,
    border: `1px solid ${themeVariables.primaryColor}`,
    fontFamily: themeVariables.secondaryFont,
    fontWeight: 800,
    margin: '8px'
  }
})

interface OperatorParams {
	text: string;
  action?: () => void;
}

export default function Operator (params: OperatorParams): JSX.Element {
  return (
    <Button className={css(styles.circle)} onClick={params.action}>
      {params.text}
    </Button>
  )
}
