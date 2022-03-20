import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import themeVariables from '../../themeVariables.module.scss';

const styles = StyleSheet.create({
  square: {
    position: 'relative',
    width: '70px',
    height: '70px',
    borderRadius: '10%',
    color: 'black',
    fontSize: '24px',
    boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.16)',
    backgroundColor: themeVariables.lightGreyColor ,
    border: `1px solid ${themeVariables.primaryColor}`,
    fontFamily: themeVariables.secondaryFont,
    fontWeight: 800,
    margin: '0 24px'
  },
  value : {
    textAlign: 'center',
    marginTop: '4px'
  }
})

interface SquareParams {
  value: number;
}

export default function SquareButton(params: SquareParams): JSX.Element {
  return (
    <div className={css(styles.square)}>
      <h4 className={css(styles.value)}>{params.value}</h4>
    </div>
  )
}
