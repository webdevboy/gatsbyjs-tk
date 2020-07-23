import React, { useEffect } from "react";
import { navigate } from 'gatsby';
import { ParallaxProvider } from 'react-scroll-parallax';

import CategoryWrapper from './CategoryWrapper';
import { getDevPasswordAccepted } from 'src/utils/getDevPasswordAccepted';

const Category = ({ pageContext }) => {
  useEffect(() => {
    if(!getDevPasswordAccepted()) {
      navigate('/developing');
    }
  }, []);  
  return (
    <ParallaxProvider>
      <CategoryWrapper {...{ pageContext }} />
    </ParallaxProvider>
  )
}
export default Category;
