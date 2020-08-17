import React, { useState, useRef, useEffect } from 'react';
import * as cx from 'classnames';
import LanguageToggle from 'src/components/LanguageToggle/LanguageToggle';
import LoginLogout from 'src/components/LoginLogout/LoginLogout';
import { Link } from 'gatsby';
import useWindow from 'src/hooks/useWindow';
import { heroAnimationDuration } from 'src/utils/styleVars';
import { useLocation } from '@reach/router';
import { useTranslation } from 'react-i18next';

import './header.scss';
import convertLinkLocale from 'src/utils/convertLinkLocale';
import Hamburger from 'src/components/common/Hamburger/Hamburger';
import AdaptiveImage from 'src/components/common/AdaptiveImage/AdaptiveImage';

import Logo from 'src/svgs/tk_logo';
import LogoDesktop from 'src/images/TK_logo_desktop_1.svg';
import LogoDesktopTitle from 'src/images/TK_logo_desktop_2.svg';
import LogoMobile from 'src/images/TK_logo_mobile_1.svg';
import LogoMobileTitle from 'src/images/TK_logo_mobile_2.svg';
import Facebook from 'src/images/Facebook_icon_gray.png';
import WeChat from 'src/images/WeChat_icon_gray.png';
import Weibo from 'src/images/Weibo_icon_gray.png';
import Twitter from 'src/images/twitter.png';
import Whatsapp from 'src/images/whatsapp.png';

function ScrollProgressBar({ articleHeaderRef, scrollBlockRef, logoRef, headerOptRef }) {
  const _window = useWindow();
  const progressBarRef = useRef();
  const location = useLocation();
  let scrollListener = null;
  useEffect(() => {
    if(progressBarRef) {
      progressBarRef.current.style.width = 0;
    }
    scrollListener = window.addEventListener('scroll', () => {
        
      const currentScroll = document.documentElement.scrollTop;
      const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollProgress = (currentScroll / totalScroll) * 100;
      if(progressBarRef && progressBarRef.current) {
        progressBarRef.current.style.width = `${scrollProgress}%`;
      }
      if(currentScroll > 50 && articleHeaderRef && articleHeaderRef.current) {
        articleHeaderRef.current.classList.add('scrolled');
        if(headerOptRef && headerOptRef.current) {
          headerOptRef.current.classList.add('scrolled');
        }
        if(logoRef && logoRef.current) {
          logoRef.current.classList.add('scrolled');
        }
      }
      else {
        if(articleHeaderRef && articleHeaderRef.current) {
          articleHeaderRef.current.classList.remove('scrolled');
        }
        if(headerOptRef && headerOptRef.current) {
          headerOptRef.current.classList.remove('scrolled');
        }
        if(logoRef && logoRef.current) {
          logoRef.current.classList.remove('scrolled');
        }
      }
    });
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

function Header({ theme, showNav, setShowNav, isFrontPage, isArticlePage, pageScroll, heroIsVisible, title, shifted, homeHeroLoaded }) {
  const [siteNameTop, setSiteNameTop] = useState(true);
  const logoContainerRef = useRef(null);
  const articleHeaderRef = useRef(null);
  const logoRef = useRef(null);
  const headerOptRef = useRef(null);
  const _window = useWindow() || {};
  const [t, i18n] = useTranslation();

  const getLogoPosY = () => {
    const smallOffset = 100; // based on logo width 150px
    const mediumOffset = 180; // based on a logo width 290px

    if (_window.innerWidth < 834) {
      return _window.innerHeight / 2 + smallOffset;
    }

    return _window.innerHeight / 2 + mediumOffset;
  };

  const openWeChatShareQR = e => {
    e.preventDefault();
    if(_window) {
      _window.open(`https://chart.googleapis.com/chart?cht=qr&chs=180x180&chl=${document.location.href}`, 'WeChat Share QR Code', 'height:700, width:700');
    }
  }

  const openWeiboShare = e => {
    e.preventDefault();
    if(_window) {
      _window.open(`http://service.weibo.com/share/share.php?title=${title}&url=${document.location.href}`, 'Weibo', 'height:700, width:700');
    }
  }

  const openFacebookShare = e => {
    e.preventDefault();
    if(_window) {
      _window.open(`https://www.facebook.com/sharer/sharer.php?u=${document.location.href}`, 'Facebook',  'height:700, width:700');
    }
  }

  const openTwitterShare = e => {
    e.preventDefault();
    if(_window) {
      _window.open(`https://twitter.com/intent/tweet?text=${document.location.href}`, 'Twitter',  'height:700, width:700');
    }
  }

  const openWhatsappShare = e => {
    e.preventDefault();
    if(_window) {
      _window.open(`https://web.whatsapp.com/send?&text=${document.title} - ${document.location.href}`, 'Whatsapp', 'height:700, width:700');
    }
  }
  
  useEffect(() => {
    if (heroIsVisible && logoContainerRef && logoContainerRef.current) {
      setTimeout(() => {
        if(logoContainerRef.current) {
          setSiteNameTop(logoContainerRef.current.getBoundingClientRect().bottom);
        }
      }, heroAnimationDuration);
    }
  }, [heroIsVisible]);


  return (
    <header className={cx(`header ${theme}`, {
      'overflow-visible': isFrontPage,
      'header-absolute': isFrontPage,
      'header-fixed': !isFrontPage,
      'shifted': shifted,
    })}>
      <div>
        <button className={cx('header-hamburger', { 'show': showNav })} onClick={() => setShowNav()}>
          <Hamburger isOpen={showNav} theme={theme} />
        </button>
      </div>
      {!isFrontPage ? (
        <Link to={convertLinkLocale('/', i18n.language)}>
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
              'loaded': homeHeroLoaded,
            })}
            style={{
              // transform: isFrontPage && heroIsVisible ? `translate(-50%, )` : 'translate(-50%, -50%)',
              top: isFrontPage && heroIsVisible ? `-${getLogoPosY()}px` : '50%',

            }}
          >
            <AdaptiveImage
              src={LogoDesktop}
              smallSrc={LogoMobile}
              innerProps={{
                className: 'fp-logo'
              }}
            />
            <AdaptiveImage
              src={LogoDesktopTitle}
              smallSrc={LogoMobileTitle}
              innerProps={{
                className: cx('sitename', 'first-init', { 'show-site-name': heroIsVisible, 'hide-site-name': !heroIsVisible }),
              }}
            />
          </div>
          
        </>
      )}

      <div className="header__language-login" ref={headerOptRef}>
        <LanguageToggle theme={theme} pageScroll={pageScroll} />
        <LoginLogout />
      </div>

      {isArticlePage && (
        <div className="header__article-wrapper">
          <div ref={articleHeaderRef} className={`header__article ${theme}`}>
            <div dangerouslySetInnerHTML={{ __html: title }} />
            <div className="header__article__shares">
              <div className="header__article__shares__title">
                Share:
              </div>
              <a href="#" onClick={openFacebookShare}>
                <img src={Facebook} />
              </a>
              <a href="#" onClick={openWeChatShareQR}>
                <img src={WeChat} />
              </a>
              <a href="#" onClick={openWeiboShare}>
                <img src={Weibo} />
              </a>
              <a href="#" onClick={openTwitterShare}>
                <img src={Twitter} />
              </a>
              <a href="#" onClick={openWhatsappShare}>
                <img src={Whatsapp} />
              </a>
            </div>
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
