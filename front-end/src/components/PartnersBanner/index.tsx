import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import themeVariables from '../../themeVariables.module.scss';

const styles = StyleSheet.create({
  container: {
    height: '30vh',
    backgroundColor: themeVariables.lightGreyColor
  },
  logos: {
    margin: '0 auto'
  }
});

export default function PartnersBanner(): JSX.Element {
  return (
    <div className={css(styles.container)}>
      <div className={css(styles.logos)}>
        <p>Partner logos go here</p>
      </div>
    </div>
  );
}
