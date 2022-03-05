import React from 'react';
import Button from 'react-bootstrap/Button';
import { StyleSheet, css } from 'aphrodite';
import themeVariables from '../../themeVariables.module.scss';
import { FunctionExpression } from 'typescript';

const styles = StyleSheet.create({
  button: {
    border: 'none',
    boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.16)',
    borderRadius: '24px',
    fontFamily: themeVariables.secondaryFont,
    fontWeight: 800,
    padding: '16px 24px',
  },
  primaryButton: {
    background: themeVariables.primaryColor,
    color: themeVariables.lightColor,
  },
  secondaryButton: {
    background: themeVariables.whiteColor,
    border: `2px solid ${themeVariables.thirdColor}`,
    boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.32)',
    color: themeVariables.darkColor,
    margin: '0 0 20px 20px',
  }
});

export interface Params {
  callToAction: string;
  primary?: boolean;
  link?: string;
  action?: () => void;
}

export default function MainButton(params: Params): JSX.Element {
  const style = params.primary ? css(styles.primaryButton) : css(styles.secondaryButton);

  return (
    <a href={params.link} target='_blank' rel='noreferrer'>
      <Button variant="primary" className={`${css(styles.button)} ${style}`} onClick={params.action}>
        {params.callToAction}
      </Button>
    </a>  
  );
}
