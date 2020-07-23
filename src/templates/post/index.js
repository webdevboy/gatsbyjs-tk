import React, { useEffect } from "react";
import { navigate } from 'gatsby';
import { ParallaxProvider } from 'react-scroll-parallax';

import PostWrapper from './PostWrapper';
import { getDevPasswordAccepted } from 'src/utils/getDevPasswordAccepted';

const Post = ({ pageContext }) => {
  useEffect(() => {
    if(!getDevPasswordAccepted()) {
      navigate('/developing');
    }
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
