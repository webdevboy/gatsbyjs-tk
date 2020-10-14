import React, { useEffect } from "react";
import { ParallaxProvider } from 'react-scroll-parallax';
import { useLocation } from '@reach/router';
import { useTranslation } from 'react-i18next';
import useWindow from 'src/hooks/useWindow';
import setLanguage from 'src/utils/setLanguage';

import CategoryWrapper from './CategoryWrapper';

const Category = ({ pageContext }) => {
  const _window = useWindow();
  const location = useLocation();
  const [t, i18n] = useTranslation();
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
    setLanguage(location.pathname, i18n);
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
