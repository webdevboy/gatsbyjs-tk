import React from 'react';
import { Helmet } from 'react-helmet';

import Layout from '../../components/Layout';
import LostPassword from 'src/components/LostPassword/LostPassword';

function LostPasswordPage() {
  return (
    <Layout removeTopPadding>
      <Helmet>
        <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
      </Helmet>
      <LostPassword />
    </Layout>
  );
}

export default LostPasswordPage;
