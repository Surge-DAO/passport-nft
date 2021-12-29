import React from 'react';
import Button from 'react-bootstrap/Button';
import { StyleSheet, css } from 'aphrodite';
import themeVariables from '../../themeVariables.module.scss';

const styles = StyleSheet.create({
  button: {
    background: themeVariables.primaryColor,
    border: 'none',
    boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.16)',
    borderRadius: '24px',
    fontFamily: themeVariables.secondaryFont,
    fontWeight: 800,
    padding: '16px 24px',
    color: themeVariables.lightColor
  }
})

interface Params {
  callToAction: string;
}

export default function PrimaryButton(params: Params): JSX.Element {
  return (
    <>
      <Button variant="primary" className={css(styles.button)}>
        {params.callToAction}
      </Button>
    </>
  )
}
