import React, { useEffect } from "react";
import { useLocation } from '@reach/router';
import { useTranslation } from 'react-i18next';
import setLanguage from 'src/utils/setLanguage';

import { isBrowser } from 'src/utils/auth';
import Layout from "src/components/Layout";
import SEO from "src/components/seo";
import NotFound from 'src/components/NotFound/NotFound';

const NotFoundPage = () => {
  const location = useLocation();
  const [t, i18n] = useTranslation();
  useEffect(() => {
    setLanguage(location.pathname, i18n);
  }, []);
  return isBrowser ? (
    <Layout theme="dark" removeTopPadding>
      <SEO title="404: Not found" />
      <NotFound />
    </Layout>
  )
  :
  null
}

export default NotFoundPage
