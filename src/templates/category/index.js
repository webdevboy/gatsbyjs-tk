import React from "react";
import { ParallaxProvider } from 'react-scroll-parallax';

import CategoryWrapper from './CategoryWrapper';

const Category = ({ pageContext }) => {
  return (
    <ParallaxProvider>
      <CategoryWrapper {...{ pageContext }} />
    </ParallaxProvider>
  )
}
export default Category;
