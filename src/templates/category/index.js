import React, { useEffect } from "react";
import { ParallaxProvider } from 'react-scroll-parallax';
import useWindow from 'src/hooks/useWindow';

import CategoryWrapper from './CategoryWrapper';

const Category = ({ pageContext }) => {
  const _window = useWindow();
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
    localStorage.setItem('articleFallbackUrl', '');
    scrollTop();
  }, []);
  return (
    <ParallaxProvider>
      <CategoryWrapper {...{ pageContext }} />
    </ParallaxProvider>
  )
}
export default Category;
