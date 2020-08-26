import React, { useEffect } from "react";
import { navigate } from 'gatsby';
import { ParallaxProvider } from 'react-scroll-parallax';

import PostWrapper from './PostWrapper';
import { getDevPasswordAccepted } from 'src/utils/getDevPasswordAccepted';
import useWindow from 'src/hooks/useWindow';

const Post = ({ pageContext }) => {
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
  _window._scrollTop = scrollTop;
  useEffect(() => {
    if(!getDevPasswordAccepted()) {
      navigate('/developing');
    }
  }, []);
  useEffect(() => {
    scrollTop();
  }, [pageContext.id]);
  return (
    <div className="post-page-wrapper">
      <ParallaxProvider>
        <PostWrapper {...{ pageContext }} />
      </ParallaxProvider>
    </div>
  );
};

export default Post;
