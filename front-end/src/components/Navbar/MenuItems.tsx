import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { navBarItems } from '../../data/NavBarItems';
import themeVariables from '../../themeVariables.module.scss';

interface MenuItemsParams {
  containerStyle?: string;
  listStyle: string;
  textStyle: string;
}

const styles = StyleSheet.create({
  containerMobileMenu: {
    marginBottom: '40px'
  },
  itemText: {
    color: themeVariables.darkColor,
    fontWeight: 500
  },
  flex: {
    display: 'flex'
  }
});

export default function MenuItems(params: MenuItemsParams): JSX.Element {
  const { containerStyle, listStyle, textStyle = '' } = params;

  return (
    <div className={`${css(styles.flex)} ${containerStyle && css(styles.containerMobileMenu)}`}>
      <ul className={listStyle}>
        {navBarItems.map((item, idx) => {
          return (
            <li key={idx}>
              <a href={item.link}>
                <p className={`${textStyle} ${css(styles.itemText)}`}>{item.name}</p>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
