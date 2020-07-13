import React from "react";
import { ParallaxProvider } from 'react-scroll-parallax';

import PostWrapper from './PostWrapper';

const Post = ({ pageContext }) => (
  <div className="post-page-wrapper">
    <ParallaxProvider>
      <PostWrapper {...{ pageContext }} />
    </ParallaxProvider>
  </div>
);

export default Post;
