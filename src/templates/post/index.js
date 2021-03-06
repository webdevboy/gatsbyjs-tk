import React, { useEffect } from "react";
import { useLocation } from '@reach/router';
import { useTranslation } from 'react-i18next';
import { ParallaxProvider } from 'react-scroll-parallax';

import PostWrapper from './PostWrapper';
import useWindow from 'src/hooks/useWindow';
import useComponentWillMount from 'src/hooks/useComponentWillMount';
import setLanguage from 'src/utils/setLanguage';

const Post = ({ pageContext }) => {
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
  useComponentWillMount(() => {setLanguage(location.pathname, i18n)});
  useEffect(() => {
    scrollTop();
  }, [pageContext.id]);
  useEffect(() => {
    localStorage.setItem('articleFallbackUrl', '');
  }, []);
  return (
    <div className="post-page-wrapper">
      <ParallaxProvider>
        <PostWrapper {...{ pageContext }} />
      </ParallaxProvider>
    </div>
  );
};

export default Post;
