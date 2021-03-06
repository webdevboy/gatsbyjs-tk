import React, { useState, useRef, useEffect } from 'react';
import * as cx from 'classnames';
import LanguageToggle from 'src/components/LanguageToggle/LanguageToggle';
import LoginLogout from 'src/components/LoginLogout/LoginLogout';
import { Link } from 'gatsby';
import useWindow from 'src/hooks/useWindow';
import { useLocation } from '@reach/router';
import { useTranslation } from 'react-i18next';
import { MEDIUM_BREAKPOINT } from 'src/utils/breakpoints';

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
import Share from 'src/images/share.svg';
import Pinterest from 'src/images/pinterest-circular-logo.png';

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
        document.querySelector('.header__article').classList.remove('hide-share');
        articleHeaderRef.current.classList.add('scrolled');
        if(headerOptRef && headerOptRef.current) {
          headerOptRef.current.classList.add('scrolled');
        }
      } else {
        if(articleHeaderRef && articleHeaderRef.current) {
          articleHeaderRef.current.classList.remove('scrolled');
        }
        if(headerOptRef && headerOptRef.current) {
          headerOptRef.current.classList.remove('scrolled');
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

function Header({ theme, showNav, setShowNav, isFrontPage, isArticlePage, pageScroll, heroIsVisible, title, shifted, homeHeroLoaded, pageScrolled, articleImageUrl }) {
  const [showShare, setShowShare] = useState(false);
  const logoContainerRef = useRef(null);
  const articleHeaderRef = useRef(null);
  const logoRef = useRef(null);
  const headerOptRef = useRef(null);
  const _window = useWindow() || {};
  const [t, i18n] = useTranslation();

  const isMobile = _window.innerWidth < MEDIUM_BREAKPOINT ? true : false;

  const getFormattedUrl = url => {
    return url[url.length - 1] === '/' ? url : `${url}/`;
  }

  useEffect(() => {
    if (_window) {
      _window.addEventListener('scroll', () => {
        setShowShare(false);
      });
    }
  }, []);

  const openWeChatShareQR = e => {
    e.preventDefault();
    if(_window) {
      const url = getFormattedUrl(document.location.href);
      _window.open(`https://chart.googleapis.com/chart?cht=qr&chs=180x180&chl=${url}`, 'WeChat Share QR Code', 'height:700, width:700');
    }
  }

  const openWeiboShare = e => {
    e.preventDefault();
    if(_window) {
      const url = getFormattedUrl(document.location.href);
      _window.open(`http://service.weibo.com/share/share.php?title=${title}&url=${url}`, 'Weibo', 'height:700, width:700');
    }
  }

  const openPinterestShare = e => {
    e.preventDefault();
    if(_window) {
      const url = getFormattedUrl(document.location.href);
      _window.open(`https://www.pinterest.com/pin/create/button/?description=${title}&media=${articleImageUrl}&url=${url}`, 'Weibo', 'height:700, width:700');
    }
  }

  const openFacebookShare = e => {
    e.preventDefault();
    if(_window) {
      const url = getFormattedUrl(document.location.href);
      _window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, 'Facebook',  'height:700, width:700');
    }
  }

  const openTwitterShare = e => {
    e.preventDefault();
    if(_window) {
      const url = getFormattedUrl(document.location.href);
      _window.open(`https://twitter.com/intent/tweet?text=${url}`, 'Twitter',  'height:700, width:700');
    }
  }

  const openWhatsappShare = e => {
    if(!isMobile && _window) {
      const url = getFormattedUrl(document.location.href);
      e.preventDefault();
      _window.open(`https://api.whatsapp.com/send?&text=${document.title} - ${url}`, 'Whatsapp', 'height:700, width:700');
    }
  }

  const isDocument = typeof document !== `undefined`;

  return (
    <header className={cx(`header ${theme}`, {
      'overflow-visible': isFrontPage,
      'header-absolute': isFrontPage && heroIsVisible,
      'header-fixed': !isFrontPage || !heroIsVisible,
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
                className: cx('sitename', 'first-init', { 'show-site-name': !pageScrolled, 'hide-site-name': pageScrolled }),
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
          <div ref={articleHeaderRef} className={cx(`header__article ${theme} ${showShare ? 'show-share' : 'hide-share'}`, {
            'scrolled': showShare
          })}>
            <div className="header__article__title" dangerouslySetInnerHTML={{ __html: title }} />
            <div className="header__article__shares">
              <div className="header__article__shares__title">
                {`${t('article:share')}:`}
              </div>
              <div className="header__article__mobile-share" onClick={() => setShowShare(!showShare)}>
                <img src={Share} alt="share icon" />
              </div>
              <a href="#" onClick={openFacebookShare}>
                <img src={Facebook} alt="facebook icon" />
              </a>
              <a href="#" onClick={openWeChatShareQR}>
                <img src={WeChat} alt="wechat icon" />
              </a>
              <a href="#" onClick={openPinterestShare}>
                <img src={Pinterest} alt="pinterest icon" />
              </a>
              <a href="#" onClick={openTwitterShare}>
                <img src={Twitter} alt="twitter icon" />
              </a>
              <a href={`https://api.whatsapp.com/send?&text=${isDocument && document.title} - ${isDocument && document.location.href}`} onClick={openWhatsappShare}>
                <img src={Whatsapp} alt="whatsapp icon" />
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
