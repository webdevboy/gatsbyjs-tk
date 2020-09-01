import React, { useEffect } from "react";
import { ParallaxProvider } from 'react-scroll-parallax';

import CategoryWrapper from './CategoryWrapper';

const Category = ({ pageContext }) => {
  useEffect(() => {
    localStorage.setItem('articleFallbackUrl', '');
  }, []);
  return (
    <ParallaxProvider>
      <CategoryWrapper {...{ pageContext }} />
    </ParallaxProvider>
  )
}
export default Category;
