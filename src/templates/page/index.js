import React, { useEffect, useState, useRef } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
import { TweenMax, Power2 } from 'gsap';

import Layout from 'src/components/Layout';
import SEO from 'src/components/seo';
import PageLayouts from 'src/components/PageLayouts';
import { Swipeable } from 'react-swipeable';
import * as cx from 'classnames';

import { PageHero } from 'src/components';
import useWindow from 'src/hooks/useWindow';

import { heroAnimationDuration } from 'src/utils/styleVars';

const FrontPage = ({ pageContext, heroData }) => {
  const { title, components } = pageContext;
  const [scrollWrapper, setScrollWrapper] = useState(null);
  const _window = useWindow() || {};
  const containerRef = useRef(null);
  const [showHero, setShowHero] = useState(true);
  const [containerIsScrollable, setContainerIsScrollable] = useState(false);

  const layouts = components.contents || [];

  useEffect(() => {
    const scrollTime = 1.2;
    const scrollDistance = 400;
    let wheelListener1 = null;
    let wheelListener2 = null;
    const moveScroll = event => {
      if(containerRef && containerRef.current && containerRef.current.classList && containerRef.current.classList.contains('overflow-scroll')) {
        event.preventDefault(); 
        const delta = event.wheelDelta / 120 || -event.detail / 3;
        const scrollTop = containerRef.current.scrollTop;
        const finalScroll = scrollTop - parseInt(delta * scrollDistance);
        TweenMax.to(containerRef.current, scrollTime, { scrollTop : finalScroll, ease: Power2.easeOut, overwrite: 5 });
      }
    }

    if(_window && _window.addEventListener) {
      wheelListener1 = _window.addEventListener("mousewheel", moveScroll, { passive: false });
      wheelListener2 = _window.addEventListener("DOMMouseScroll", moveScroll, { passive: false });
    }

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

      if(wheelListener1) {
        _window.removeEventListener(wheelListener1);
      }
      if(wheelListener2) {
        _window.removeEventListener(wheelListener2);
      }
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
            <Layout
              theme="light"
              isFrontPage={true}
              heroIsVisible={showHero}
              isFrontPage={pageContext.isFrontPage}
              pageScroll={containerRef}
            >
              <SEO title={title || 'Untitled'} />
              {layouts.map((layout, index) => (
                <PageLayouts key={index} layoutData={layout} />
              ))}
            </Layout>
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
        <FrontPage pageContext={pageContext} heroData={heroData} />
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
