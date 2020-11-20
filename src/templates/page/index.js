import React, { Component, useEffect, useState, useRef } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
import { globalHistory } from '@reach/router';
import i18next from 'i18next';

import Layout from 'src/components/Layout';
import useWindow from 'src/hooks/useWindow';
import SEO from 'src/components/seo';
import PageLayouts from 'src/components/PageLayouts';
import { Swipeable } from 'react-swipeable';
import * as cx from 'classnames';

import { isBrowser } from 'src/utils/auth';
import setLanguage from 'src/utils/setLanguage';
import { PageHero } from 'src/components';
import FrontPage from './FrontPage';
import DefaultPage from './DefaultPage';

const FrontPageProvider = ({ pageContext, heroData, updateParallaxState }) => {
  const { title, components } = pageContext;
  const [scrollWrapper, setScrollWrapper] = useState(null);
  const [homeHeroLoaded, setHomeHeroLoaded] = useState(false);
  const [showHero, setShowHero] = useState(true);
  const [pageScrolled, setPageScrolled] = useState(false);
  const containerRef = useRef(null);
  const _window = useWindow() || {};

  const [containerIsScrollable, setContainerIsScrollable] = useState(false);

  const layouts = components.contents || [];

  const scrollTop = () => {
    const scrollBlock = document.querySelector('.page-scroll');
    const swipeWrapper = document.querySelector('.swipe-wrapper');
    if(!_window) return;
    if(swipeWrapper) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    else if(scrollBlock) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  useEffect(() => {
    document.querySelector('#main-wrapper').classList.add('is-front-page');
    if (_window) {
      _window.addEventListener('scroll', () => {
        const logo = document.querySelector('.fp-logo-container');
        const logoSize = _window.innerWidth < 834 ? 178 : 300;
        const topPosition = _window.innerWidth < 834 ? 60 : 55;
        const speed = _window.innerWidth < 834 ? 7 : 13.2;

        let scrollTop = _window.scrollY,
                minWidth = 55,
                newWidth = Math.max(minWidth, logoSize - scrollTop/3);
        const styleTranslate = `translate(-50%, ${Math.min(0, -topPosition + scrollTop/speed)}vh) scale(${newWidth/logoSize})`;
        if(logo) {
          logo.style['-webkit-transform'] = styleTranslate;
          logo.style['-moz-transform'] = styleTranslate;
          logo.style['-ms-transform'] = styleTranslate;
          logo.style['-o-transform'] = styleTranslate;
          logo.style.transform = styleTranslate;
        }
        scrollTop > 10 ? setPageScrolled(true) : setPageScrolled(false);
        scrollTop >= _window.innerHeight ? setShowHero(false) : setShowHero(true);
      });
    }
    localStorage.setItem('articleFallbackUrl', '');
    scrollTop();
    return () => {
      document.querySelector('#main-wrapper').classList.remove('is-front-page');
      document.querySelector('#main-wrapper').style.transform = 'initial';
    };
  }, []);
  return (
    <>
        <PageHero data={heroData[0]} scrollContainer={containerRef.current} setHomeHeroLoaded={setHomeHeroLoaded} />
        <Swipeable className="swipe-container">
          <div
            className={cx('swipe-wrapper')}
            ref={containerRef}
            id="content"
          >
            <ParallaxProvider scrollContainer={scrollWrapper}>
              <FrontPage
                {...{
                  showHero,
                  pageContext,
                  containerRef,
                  title,
                  containerIsScrollable, 
                  layouts,
                  updateParallaxState,
                  homeHeroLoaded,
                  pageScrolled,
                  pageHero: heroData[0]
                }}
              />
            </ParallaxProvider>
          </div>
        </Swipeable>
    </>
  );
};
  
class Page extends Component {
  UNSAFE_componentWillMount() {
    if(isBrowser) {
      setLanguage(globalHistory.location.pathname, i18next);
    }
  }
  render() {
    const { pageContext } = this.props;
    const { title, components } = pageContext;
    const heroData = pageContext.components.contents.filter(
      (o) => o.fieldGroupName === 'page_Components_Contents_HomepageHero'
    );
    const destionationsData = pageContext.components.contents.filter(o => o.fieldGroupName === 'page_Components_Contents_DestinationBanner');
    const layouts = components.contents || [];
    const aboutLayouts = components.aboutContents || [];
    const eventsLayouts = components.eventContents || [];
    return (
      <>
        {pageContext.isFrontPage && heroData.length ? (
          <FrontPageProvider pageContext={pageContext} heroData={heroData} />
        ) : (
          <ParallaxProvider>
            <DefaultPage
              {...{
                title,
                destionationsData,
                pageUri: pageContext.uri,
                layouts: [...layouts, ...aboutLayouts, ...eventsLayouts],
              }}
            />
          </ParallaxProvider>
        )}
      </>
    );
  }
};

export default Page;
