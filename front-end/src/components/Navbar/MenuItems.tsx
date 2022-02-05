import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { navBarItems } from '../../data/NavBarItems';
import themeVariables from '../../themeVariables.module.scss';


interface MenuItemsParams {
  containerStyle?: string;
  listStyle: string;
}

const styles = StyleSheet.create({
  containerMobileMenu: {
    marginBottom: '40px'
  },
  itemText: {
    color: themeVariables.darkColor,
    fontWeight: 500,
    marginTop: '18px'
  }
})

export default function MenuItems(params: MenuItemsParams): JSX.Element {
  const { containerStyle, listStyle } = params;

  return (
    <div className={containerStyle && css(styles.containerMobileMenu)}>
      <ul className={listStyle}>
        {navBarItems.map((item, idx) => {
          return (
            <li key={idx}>
              <a href={item.link}>
                <p className={css(styles.itemText)}>{item.name}</p>
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
