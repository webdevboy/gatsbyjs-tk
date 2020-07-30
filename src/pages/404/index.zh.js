import React from "react";

import Layout from "src/components/Layout";
import SEO from "src/components/seo";
import NotFound from 'src/components/NotFound/NotFound';

const NotFoundPage = () => (
  <Layout theme="dark">
    <SEO title="404: Not found" />
    <NotFound />
  </Layout>
)

export default NotFoundPage
