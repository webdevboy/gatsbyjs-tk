import React, { useState, useRef, useEffect } from 'react';
import * as cx from 'classnames';
import Logo from 'src/svgs/tk_logo';
import LanguageToggle from 'src/components/LanguageToggle/LanguageToggle';
import LoginLogout from 'src/components/LoginLogout/LoginLogout';
import { Link } from 'gatsby';
import useWindow from 'src/hooks/useWindow';
import { heroAnimationDuration } from 'src/utils/styleVars';

import './header.scss';

function Hamburger({ isOpen }) {
  return (
    <div className={cx('nav-icon', { open: isOpen })}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}

function Header({ theme, showNav, setShowNav, isFrontPage, heroIsVisible }) {
  const [siteNameTop, setSiteNameTop] = useState(true);
  const logoContainerRef = useRef(null);
  const _window = useWindow() || {};

  const getLogoPosY = () => {
    const smallOffset = 52; // based on logo width 150px
    const mediumOffset = 103; // based on a logo width 290px

    if (_window.innerWidth < 834) {
      return _window.outerHeight / 2 + smallOffset;
    }

    return _window.outerHeight / 2 + mediumOffset;
  };

  useEffect(() => {
    if (heroIsVisible && logoContainerRef && logoContainerRef.current) {
      setTimeout(() => {
        setSiteNameTop(logoContainerRef.current.getBoundingClientRect().bottom);
      }, heroAnimationDuration);
    }
  }, [heroIsVisible]);

  return (
    <header className={`header ${theme}`}>
      <button onClick={() => setShowNav()}>
        <Hamburger isOpen={showNav} />
      </button>
      {!isFrontPage ? (
        <Link to="/">
          <Logo className="logo" />
        </Link>
      ) : (
        <>
          <div
            ref={logoContainerRef}
            className={cx('fp-logo-container', {
              'on-hero': heroIsVisible,
              'on-header': !heroIsVisible,
            })}
            style={{
              top: isFrontPage && heroIsVisible ? `-${getLogoPosY()}px` : '50%',
            }}
          >
            <Logo className="fp-logo" />
          </div>
          <p
            className={cx('sitename', { 'show-site-name': heroIsVisible })}
            style={{ top: `-${siteNameTop}px` }}
          >
            TASTING KITCHEN
          </p>
        </>
      )}

      <div className="header__language-login">
        <LanguageToggle theme={theme} />
        <LoginLogout />
      </div>
    </header>
  );
}

export default Header;
