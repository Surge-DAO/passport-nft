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
      color: themeVariables.primaryColor
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
  },
  img: {
    width: '25px',
    paddingRight: '5px'
  }
});

 interface Params {
  action?: () => void;
  callToAction: string;
  customStyle?: string;
  disable?: boolean;
  fullWidth?: boolean;
  primary?: boolean;
  img?: string;
  link?: string;
}

export default function MainButton(params: Params): JSX.Element {
  const { action, callToAction, customStyle, disable, fullWidth, primary, img, link } = params;
  const btnType = primary ? css(styles.primaryButton) : css(styles.secondaryButton);
  const width = fullWidth ? css(styles.fullWidth) : undefined;

  return (
    <Button disabled={disable} variant="primary" className={`${css(styles.button)} ${btnType} ${width} ${customStyle}`} onClick={link ? () => window.open(link) : action}>
      {img && <img src={img} alt={callToAction.toUpperCase()} className={css(styles.img)} />}
      {callToAction.toUpperCase()}
    </Button>
  );
}
