import React from "react";

import { isBrowser } from 'src/utils/auth';
import Layout from "src/components/Layout";
import SEO from "src/components/seo";
import NotFound from 'src/components/NotFound/NotFound';

const NotFoundPage = () => {
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
