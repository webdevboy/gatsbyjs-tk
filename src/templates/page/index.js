import React, { Component, useEffect, useState, useRef } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';

import Layout from 'src/components/Layout';
import SEO from 'src/components/seo';
import PageLayouts from 'src/components/PageLayouts';
import { Swipeable } from 'react-swipeable';
import * as cx from 'classnames';

import { PageHero } from 'src/components';
import FrontPage from './FrontPage';

import { heroAnimationDuration } from 'src/utils/styleVars';

const FrontPageProvider = ({ pageContext, heroData, updateParallaxState }) => {
  const { title, components } = pageContext;
  const [scrollWrapper, setScrollWrapper] = useState(null);
  const [smoothScrollInited, setSmoothScrollInited] = useState(false);
  const [isHeroAnimationInProgress, setIsHeroAnimationInProgress] = useState(false);
  const [homeHeroLoaded, setHomeHeroLoaded] = useState(false);
  const [showHero, setShowHero] = useState(true);
  const containerRef = useRef(null);
  
  const [containerIsScrollable, setContainerIsScrollable] = useState(false);

  const layouts = components.contents || [];

  const handleWheelEvent = (event) => {
    const isScrolled = containerRef && containerRef.current && containerRef.current.scrollTop > 0;
    if(event.deltaY < 0 && !isScrolled) {
      setShowHero(true);
    }
  };


  useEffect(() => {
    setScrollWrapper(containerRef.current);
    document.querySelector('html').classList.add('no-scrolling');
    document.querySelector('#main-wrapper').classList.add('is-front-page');

    return () => {
      document.querySelector('html').classList.remove('no-scrolling');
      document.querySelector('#main-wrapper').classList.remove('is-front-page');
      document.querySelector('#main-wrapper').style.transform = 'initial';
    };
  }, []);

  useEffect(() => {
    const htmlElement = document.querySelector('html');
    document.querySelector('#main-wrapper').style.transform = showHero
      ? `translateY(0px)`
      : `translateY(-100vh)`;

    if (!showHero) {
      setTimeout(() => {
        setContainerIsScrollable(true);
      }, heroAnimationDuration);
    } else {
      setContainerIsScrollable(false);
    }
  }, [showHero]);
  return (
    <>
        <PageHero data={heroData[0]} hideHero={() => {setShowHero(false);}} scrollContainer={containerRef.current} setHomeHeroLoaded={setHomeHeroLoaded} />
        <Swipeable
          className="swipe-container"
          onSwipedDown={() => {
            if (containerRef.current && containerRef.current.scrollTop <= 0) {
              if(!isHeroAnimationInProgress) {
                setShowHero(true);
              }
              if(smoothScrollInited) {
                setSmoothScrollInited(true);
              }
            }
          }}
        >
          <div
            className={cx('swipe-wrapper', { 'overflow-scroll': containerIsScrollable })}
            ref={containerRef}
            onWheel={handleWheelEvent}
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
    const { title, components } = pageContext;
    const heroData = pageContext.components.contents.filter(
      (o) => o.fieldGroupName === 'page_Components_Contents_HomepageHero'
    );
    const layouts = components.contents || [];
    return (
      <>
        {pageContext.isFrontPage && heroData.length ? (
          <FrontPageProvider pageContext={pageContext} heroData={heroData} />
        ) : (
          <Layout theme="light" isFrontPage={false}>
            <SEO title={title || 'Untitled'} />
            {layouts.map((layout, index) => (
              <PageLayouts key={index} layoutData={layout} updateParallaxState={() => {}} />
            ))}
          </Layout>
        )}
      </>
    );
  }
};

export default Page;
