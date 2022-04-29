import React, { useEffect, useState } from 'react';
import { STRINGS } from '../../strings';
import { StyleSheet, css } from 'aphrodite';
import themeVariables from '../../themeVariables.module.scss';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import MainButton from '../MainButton';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
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
  hideSocial: {
    '@media (max-width: 768px)': {
      display: 'none'
    }
  },
  smallbtn: {
    '@media (max-width: 768px)': {
      padding: '8px 12px',
      fontSize: '12px'
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
    maxWidth: '120px',
    '@media (min-width: 375px) and (max-width: 768px)': {
      marginTop: '12px'
    }
  },
  navToggler: {
    '@media (max-width: 575px)': {
      border: 'none'
    }
  },
  containerOverride: {
    paddingRight: '40px',
    paddingLeft: '40px'
  }
});

interface Params {
  address: string;
  setAddress: (address: string) => any;
}

export default function NavBar(params: Params): JSX.Element {
  const { address, setAddress } = params;

  const [showConnectWalletModal, setShowConnectWalletModal] = useState<boolean>(false);
  const [callToAction, setCallToAction] = useState<string>(STRINGS.connectWallet.toUpperCase());

  useEffect(() => {
    address ? setCallToAction(`${address.substring(0, 5)}..${address.substring(34, 39)}`) : setCallToAction(STRINGS.connectWallet);
  }, [address])

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
                  <Nav.Item key={idx}>
                    <Nav.Link eventKey={idx} href={item.link} className={css(styles.navLinks)}>
                      {item.name}
                    </Nav.Link>
                  </Nav.Item>
                );
              })}
            </Nav>
            <Nav>
              <div className={`${css(styles.paddingTop20)} ${css(styles.hideSocial)}`}>
                <SocialMediaIcons />
              </div>
              <div className={css(styles.connectBtn)}>
                <MainButton action={() => setShowConnectWalletModal(!showConnectWalletModal)} callToAction={callToAction} primary customStyle={css(styles.smallbtn)} />
                <ConnectWalletModal address={address} show={showConnectWalletModal} onHide={() => setShowConnectWalletModal(false)} setAddress={setAddress} />
              </div>
            </Nav>
          </div>
        </Navbar.Collapse>
        <Navbar.Toggle aria-controls="offcanvasNavbar" className={css(styles.navToggler)}>
          <div className={css(styles.connectBtn)}>
            <MainButton action={() => setShowConnectWalletModal(!showConnectWalletModal)} callToAction={callToAction} primary customStyle={css(styles.smallbtn)} />
            <ConnectWalletModal address={address} show={showConnectWalletModal} onHide={() => setShowConnectWalletModal(false)} setAddress={setAddress} />
          </div>
        </Navbar.Toggle>
      </Container>
    </Navbar>
  );
}
