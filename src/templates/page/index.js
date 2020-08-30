import React, { Component, useEffect, useState, useRef } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';

import Layout from 'src/components/Layout';
import useWindow from 'src/hooks/useWindow';
import SEO from 'src/components/seo';
import PageLayouts from 'src/components/PageLayouts';
import { Swipeable } from 'react-swipeable';
import * as cx from 'classnames';

import { PageHero } from 'src/components';
import FrontPage from './FrontPage';

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

  const getLogoSize = () => {
    if (_window.innerWidth < 834) {
      return 178;
    }
    return 300;
  };

  useEffect(() => {
    document.querySelector('#main-wrapper').classList.add('is-front-page');

    if (_window) {
      _window.addEventListener('scroll', () => {
        const logo = document.querySelector('.fp-logo-container');
        let scrollTop = _window.scrollY,
                minWidth = 55,
                newWidth = Math.max(minWidth, getLogoSize() - scrollTop/3);
        const styleTranslate = `translate(-50%, ${Math.min(0, -55 + scrollTop/13.2)}vh) scale(${newWidth/300})`;
        logo.style['-webkit-transform'] = styleTranslate;
        logo.style['-moz-transform'] = styleTranslate;
        logo.style['-ms-transform'] = styleTranslate;
        logo.style['-o-transform'] = styleTranslate;
        logo.style.transform = styleTranslate;

        scrollTop > 10 ? setPageScrolled(true) : setPageScrolled(false);
        scrollTop >= _window.innerHeight ? setShowHero(false) : setShowHero(true);
      });
    }

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
                  pageScrolled
                }}
              />
            </ParallaxProvider>
          </div>
        </Swipeable>
    </>
  );
};
  
class Page extends Component {
  render() {
    const { pageContext } = this.props;
    const { title, components, fbPost } = pageContext;
    const heroData = pageContext.components.contents.filter(
      (o) => o.fieldGroupName === 'page_Components_Contents_HomepageHero'
    );
    const layouts = components.contents || [];
    const aboutLayouts = components.aboutContents || [];
    return (
      <>
        {pageContext.isFrontPage && heroData.length ? (
          <FrontPageProvider pageContext={pageContext} heroData={heroData} />
        ) : (
          <Layout theme="light" isFrontPage={false}>
            <SEO title={title || 'Untitled'} />
            {[...layouts, ...aboutLayouts].map((layout, index) => (
              <PageLayouts key={index} layoutData={layout} fbPost={fbPost} updateParallaxState={() => {}} />
            ))}
          </Layout>
        )}
      </>
    );
  }
};

export default Page;
