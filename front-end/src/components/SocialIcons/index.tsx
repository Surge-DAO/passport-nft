import React from "react";
import CircleButton from "../CircleButton";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  socials: {
    display: 'flex',
    padding: '8px',
  }
})

export default function SocialIcons(): JSX.Element {
  return (
    <div className={css(styles.socials)}>
      <CircleButton img='discord.svg' link='https://discord.com/invite/bE6TTrAyNy'/>
      <CircleButton img='twitter.svg' link='https://www.twitter.com/surge_women/'/>
      <CircleButton img='instagram.svg' link='https://www.instagram.com/surge_women/'/>
      <CircleButton img='opensea.svg' link='https://google.com'/>
    </div>
  )
}