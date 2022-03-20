import React from 'react';
import Button from 'react-bootstrap/Button';
import { StyleSheet, css } from 'aphrodite';
import themeVariables from '../../themeVariables.module.scss';

const styles = StyleSheet.create({
  button: {
    border: 'none',
    boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.16)',
    borderRadius: '24px',
    fontFamily: themeVariables.secondaryFont,
    fontWeight: 800,
    padding: '16px 24px'
  },
  primaryButton: {
    background: themeVariables.primaryColor,
    border: `2px solid ${themeVariables.thirdColor}`,
    color: themeVariables.lightColor,
    ':hover': {
      background: themeVariables.whiteColor,
      color: themeVariables.darkColor,
    }
  },
  secondaryButton: {
    background: themeVariables.whiteColor,
    border: `2px solid ${themeVariables.thirdColor}`,
    boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.32)',
    color: themeVariables.darkColor,
    ':hover': {
      background: themeVariables.primaryColor,
      color: themeVariables.lightColor
    }
  },
  fullWidth: {
    width: '100%'
  }
});

 interface Params {
  callToAction: string;
  primary?: boolean;
  link?: string;
  action?: () => void;
  fullWidth?: boolean;
  onMouseEnter?: void;
  onMouseLeave?: void;
}

export default function MainButton(params: Params): JSX.Element {
  const style = params.primary ? css(styles.primaryButton) : css(styles.secondaryButton);
  const fullWidth = params.fullWidth ? css(styles.fullWidth) : undefined;

  return (
      <Button variant="primary" className={`${css(styles.button)} ${style} ${fullWidth}`} onClick={params.link ? () => window.open(params.link) : params.action}>
        {params.callToAction}
      </Button>
  );
}
