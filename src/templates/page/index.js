import React, { useEffect, useState, useRef } from 'react';
import { ParallaxProvider, useController } from 'react-scroll-parallax';

import Layout from 'src/components/Layout';
import SEO from 'src/components/seo';
import PageLayouts from 'src/components/PageLayouts';
import { Swipeable } from 'react-swipeable';
import * as cx from 'classnames';

import { PageHero } from 'src/components';
import useWindow from 'src/hooks/useWindow';

import { heroAnimationDuration } from 'src/utils/styleVars';
import SmoothScroll from 'src/utils/smoothScroll';

const FrontPage = ({ showHero, pageContext, containerRef, title, containerIsScrollable, layouts }) => {
  const { parallaxController } = useController();
  useEffect(() => {
    window.parallaxController = parallaxController;
    setTimeout(parallaxController.update);
  }, [])
  return (
    <Layout
      theme="light"
      isFrontPage={true}
      heroIsVisible={showHero}
      isFrontPage={pageContext.isFrontPage}
      pageScroll={containerRef}
    >
      <SEO title={title || 'Untitled'} />
      {layouts.map((layout, index) => (
        <PageLayouts key={index} layoutData={layout} containerIsScrollable={containerIsScrollable} />
      ))}
    </Layout>
  )
}

const FrontPageProvider = ({ pageContext, heroData }) => {
  const { title, components } = pageContext;
  const [scrollWrapper, setScrollWrapper] = useState(null);
  const _window = useWindow() || {};
  const containerRef = useRef(null);
  const [showHero, setShowHero] = useState(true);
  const [containerIsScrollable, setContainerIsScrollable] = useState(false);

  const layouts = components.contents || [];

  useEffect(() => {

    new SmoothScroll(containerRef.current, 120, 12);
    setScrollWrapper(containerRef.current);

    setScrollWrapper(containerRef.current);

    document.querySelector('html').classList.add('no-scrolling');
    document.querySelector('#main-wrapper').classList.add('is-front-page');

    document.querySelector('#main-wrapper').style.transform = showHero
      ? `initial`
      : `translateY(-${_window.outerHeight})`;

    return () => {
      document.querySelector('html').classList.remove('no-scrolling');
      document.querySelector('#main-wrapper').classList.remove('is-front-page');
      document.querySelector('#main-wrapper').style.transform = 'initial';
    };
  }, []);

  useEffect(() => {
    document.querySelector('#main-wrapper').style.transform = showHero
      ? `translateY(0px)`
      : `translateY(-${_window.outerHeight}px)`;

    if (!showHero) {
      setTimeout(() => setContainerIsScrollable(true), heroAnimationDuration);
    } else {
      setContainerIsScrollable(false);
    }
  }, [showHero]);

  const handleWheelEvent = (event) => {
    if (
      event.deltaY < 0 &&
      containerRef.current &&
      containerRef.current.scrollTop <= 0
    ) {
      setShowHero(true);
    }
  };

  return (
    <>
      <PageHero data={heroData[0]} hideHero={() => setShowHero(false)} />
      <Swipeable
        className="swipe-container"
        onSwipedDown={() => {
          if (containerRef.current && containerRef.current.scrollTop <= 0) {
            setShowHero(true);
          }
        }}
      >
        <div
          className={cx('swipe-wrapper', {
            'overflow-scroll': containerIsScrollable,
          })}
          ref={containerRef}
          onWheel={handleWheelEvent}
          style={{ height: _window.outerHeight }}
        >
          <ParallaxProvider scrollContainer={scrollWrapper}>
            <FrontPage
              {...{
                showHero,
                pageContext,
                containerRef,
                title,
                containerIsScrollable, 
                layouts
              }}
            />
          </ParallaxProvider>
        </div>
      </Swipeable>
    </>
  );
};
  
function Page ({ pageContext }) {
  const { title, components } = pageContext

  

  const heroData = pageContext.components.contents.filter(
    (o) => o.fieldGroupName === 'page_Components_Contents_HomepageHero'
  );

  const layouts = components.contents || []

  return (
    <>
      {pageContext.isFrontPage && heroData.length ? (
        <FrontPageProvider pageContext={pageContext} heroData={heroData} />
      ) : (
        <Layout theme="light" isFrontPage={false}>
          <SEO title={title || 'Untitled'} />
          {layouts.map((layout, index) => (
            <PageLayouts key={index} layoutData={layout} />
          ))}
        </Layout>
      )}
    </>
  );
};

export default Page;
