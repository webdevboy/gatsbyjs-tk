import React, { useState, useRef, useEffect } from 'react';
import * as cx from 'classnames';
import Logo from 'src/svgs/tk_logo';
import LanguageToggle from 'src/components/LanguageToggle/LanguageToggle';
import LoginLogout from 'src/components/LoginLogout/LoginLogout';
import { Link } from 'gatsby';
import useWindow from 'src/hooks/useWindow';
import { heroAnimationDuration } from 'src/utils/styleVars';
import { useLocation } from '@reach/router';

import './header.scss';
import Facebook from 'src/images/Facebook_icon_gray.png';
import Instagram from 'src/images/Instagram_icon_gray.png';
import WeChat from 'src/images/WeChat_icon_gray.png';
import Weibo from 'src/images/Weibo_icon_gray.png';

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

function ScrollProgressBar({ articleHeaderRef, scrollBlockRef, logoRef, headerOptRef }) {
  const scrollBlock = document.querySelector('.page-scroll-wrapper');
  const _window = useWindow();
  const progressBarRef = useRef();
  const location = useLocation();
  let scrollListener = null;
  console.log(headerOptRef)
  useEffect(() => {
    if(progressBarRef) {
      progressBarRef.current.style.width = 0;
    }
    if(scrollBlockRef) {
     
      scrollListener = scrollBlockRef.current.addEventListener('scroll', () => {
        console.log('asd');
        if(!progressBarRef || !progressBarRef.current) return;
        
        const currentScroll = scrollBlockRef.current.scrollTop;
        const totalScroll = scrollBlockRef.current.scrollHeight - scrollBlockRef.current.clientHeight;
        const scrollProgress = (currentScroll / totalScroll) * 100;
        progressBarRef.current.style.width = `${scrollProgress}%`;
        if(currentScroll > 0 && articleHeaderRef) {
          articleHeaderRef.current.classList.add('scrolled');
          headerOptRef.current.classList.add('scrolled');
          if(logoRef && logoRef.current) {
            logoRef.current.classList.add('scrolled');
          }
        }
        else {
          articleHeaderRef.current.classList.remove('scrolled');
          headerOptRef.current.classList.remove('scrolled');
          if(logoRef && logoRef.current) {
            logoRef.current.classList.remove('scrolled');
          }
        }
      });
      console.log(scrollListener)
    }
    return function cleanup() {
      if(scrollListener) {
        _window.removeEventListener(scrollListener);
      }
    }
  }, [location.pathname])
  return (
    <div className="header-progress-bar-container">
      <div className="header-progress" ref={progressBarRef} /> 
    </div>
  )
}

function Header({ theme, showNav, setShowNav, isFrontPage, isArticlePage, pageScroll, heroIsVisible, title }) {
  const [siteNameTop, setSiteNameTop] = useState(true);
  const logoContainerRef = useRef(null);
  const articleHeaderRef = useRef(null);
  const logoRef = useRef(null);
  const headerOptRef = useRef(null);
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
    <header className={cx(`header ${theme}`, {
      'overflow-visible': isFrontPage,  
    })}>
      <button onClick={() => setShowNav()}>
        <Hamburger isOpen={showNav} />
      </button>
      {!isFrontPage ? (
        <Link to="/">
          <div className="logo" ref={logoRef}>
            <Logo />
          </div>
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

      <div className="header__language-login" ref={headerOptRef}>
        <LanguageToggle theme={theme} />
        <LoginLogout />
      </div>

      {isArticlePage && (
        <div ref={articleHeaderRef} className={`header__article ${theme}`}>
          <div>{title}</div>
          <div className="header__article__shares">
            <div className="header__article__shares__title">
              Share:
            </div>
            <a href="#">
              <img src={Facebook} />
            </a>
            <a href="#">
            <img src={Instagram} />
            </a>
            <a href="#">
              <img src={WeChat} />
            </a>
            <a href="#">
              <img src={Weibo} />
            </a>
          </div>
        </div>
      )}
      {isArticlePage && (
        <ScrollProgressBar {...{ articleHeaderRef, scrollBlockRef: pageScroll, logoRef, headerOptRef }} />
      )}

    </header>
  );
}

export default Header;
