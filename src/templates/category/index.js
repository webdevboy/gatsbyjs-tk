import React, { useState, useEffect, useRef } from "react";
import { TweenMax, Power2 } from 'gsap';

import useWindow from 'src/hooks/useWindow';
import Layout from "src/components/Layout";
import SEO from "src/components/seo";
import CategoryLayouts from "src/components/CategoryLayouts";

const Category = ({ pageContext }) => {
  const { name } = pageContext;
  const pageScroll = useRef(null);
  const _window = useWindow();

  useEffect(() => {
    const scrollTime = 1.2;
    const scrollDistance = 400;
    let wheelListener1 = null;
    let wheelListener2 = null;
    const moveScroll = event => {
      if(pageScroll && pageScroll.current) {
        event.preventDefault(); 
        const delta = event.wheelDelta / 120 || -event.detail / 3;
        const scrollTop = pageScroll.current.scrollTop;
        const finalScroll = scrollTop - parseInt(delta * scrollDistance);
        TweenMax.to(pageScroll.current, scrollTime, { scrollTop : finalScroll, ease: Power2.easeOut, overwrite: 5 });
      }
    }

    if(_window) {
      wheelListener1 = _window.addEventListener("mousewheel", moveScroll, { passive: false });
      wheelListener2 = _window.addEventListener("DOMMouseScroll", moveScroll, { passive: false });
    }

    if(document) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'initial';
      if(wheelListener1) {
        _window.removeEventListener(wheelListener1);
      }
      if(wheelListener2) {
        _window.removeEventListener(wheelListener2);
      }
    }
  }, []);

  return (
    <div className="page-scroll" ref={pageScroll}>
      <Layout pageScroll={pageScroll}>
        <SEO title={name || "Untitled"} />
        <CategoryLayouts categoryData={pageContext} />
      </Layout>
    </div>
  )
}

export default Category
