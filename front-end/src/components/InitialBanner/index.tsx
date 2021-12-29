import React from 'react';
import MainButton from '../MainButton';

export default function InitialComponent() {
  return (
    <>
      <h1>Surge Passport NFT</h1>
      <img src={require('../../images/nft-carousel.png')} alt="nft-sneak-peek"/>
      <div>
        <MainButton callToAction="CLICK TO MINT" primary />
        <p>Wait, what is <strong>minting</strong>?</p>
      </div>
    </>
  )
}
