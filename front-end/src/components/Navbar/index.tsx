import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { STRINGS } from '../../strings';
import { StyleSheet, css } from 'aphrodite';
import themeVariables from '../../themeVariables.module.scss';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import MainButton from '../MainButton';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import SocialMediaIcons from './SocialMediaIcons';
import { navBarItems } from '../../data/NavBarItems';
import ConnectWalletModal from '../ConnectWalletModal';
import logo from '../../images/surge-logo.png';

const styles = StyleSheet.create({
  connectBtn: {
    paddingTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    margin: 'auto',
    '@media (min-width: 375px) and (max-width: 768px)': {
      paddingTop: '20px'
    }
  },
  hideSm: {
    '@media (max-width: 575px)': {
      display: 'none'
    }
  },
  closeBtn: {
    position: 'absolute',
    top: '15px',
    right: '20px'
  },
  flex: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'space-between'
  },
  navMobile: {
    backgroundColor: themeVariables.thirdColor
  },
  navLinks: {
    color: themeVariables.darkColor,
    lineHeight: '30px',
    textTransform: 'uppercase',
    fontWeight: 500,
    '@media (min-width: 375px) and (max-width: 952px)': {
      paddingTop: '20px',
    },
    ':hover': {
      color: themeVariables.primaryColor,
      fontWeight: 'bold'
    }
  },
  paddingTop30: {
    paddingTop: '30px',
    '@media (min-width: 375px) and (max-width: 952px)': {
      paddingTop: '10px'
    }
  },
  paddingTop10: {
    paddingTop: '10px'
  },
  paddingTop20: {
    paddingTop: '20px'
  },
  displayBlock: {
    display: 'block'
  },
  imgLogo: {
    maxWidth: '120px'
  },
  containerOverride: {
    paddingRight: '40px',
    paddingLeft: '40px'
  }
});

export default function NavBar(): JSX.Element {
  const [showConnectWalletModal, setShowConnectWalletModal] = useState<boolean>(false);
  const [walletStatus, setWalletStatus] = useState<string>(STRINGS.connectWallet.toUpperCase());

  const { account } = useWeb3React();

  useEffect(() => {
    account ? setWalletStatus(`Connected ${account.substring(0, 10)}..`) : setWalletStatus(walletStatus);
  }, [account, walletStatus])

  return (
    <Navbar bg="transparent" expand="sm" collapseOnSelect>
      <Container fluid className={css(styles.containerOverride)}>
        <Navbar.Brand href={STRINGS.surgeURL} className={css(styles.paddingTop30)}>
          <Image src={logo} className={css(styles.imgLogo)} />
        </Navbar.Brand>
        <Navbar.Collapse className="me-auto">
          <div className={`${css(styles.flex)} ${css(styles.hideSm)}`}>
            <Nav className={css(styles.paddingTop30)}>
              {navBarItems.map((item, idx) => {
                return (
                  <Nav.Item>
                    <Nav.Link eventKey={idx} key={idx} href={item.link} className={css(styles.navLinks)}>
                      {item.name}
                    </Nav.Link>
                  </Nav.Item>
                );
              })}
            </Nav>
            <Nav>
              <div className={css(styles.paddingTop20)}>
                <SocialMediaIcons />
              </div>
              <div className={css(styles.connectBtn)}>
                <MainButton disable action={() => setShowConnectWalletModal(!showConnectWalletModal)} callToAction={walletStatus} primary />
                <ConnectWalletModal show={showConnectWalletModal} onHide={() => setShowConnectWalletModal(false)} setWalletStatus={setWalletStatus} />
              </div>
            </Nav>
          </div>
        </Navbar.Collapse>
        <Navbar.Toggle aria-controls="offcanvasNavbar">
          <FontAwesomeIcon icon="bars"/>
        </Navbar.Toggle>
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
          className={`${css(styles.navMobile)}`}
        >
          <Offcanvas.Header closeButton className={css(styles.closeBtn)}>
            <Offcanvas.Title id="offcanvasNavbarLabel"></Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              {navBarItems.map((item, idx) => {
                return (
                  <Nav.Item>
                    <Nav.Link href={item.link} key={idx} className={css(styles.navLinks)}>
                      {item.name}
                    </Nav.Link>
                  </Nav.Item>
                );
              })}
            </Nav>
            <div className={css(styles.paddingTop30)}>
              <SocialMediaIcons />
              <div className={css(styles.connectBtn)}>
                <MainButton disable action={() => setShowConnectWalletModal(!showConnectWalletModal)} callToAction={walletStatus} primary />
                <ConnectWalletModal show={showConnectWalletModal} onHide={() => setShowConnectWalletModal(false)} setWalletStatus={setWalletStatus} />
              </div>
            </div>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
