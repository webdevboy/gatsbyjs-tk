import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from '@reach/router';
import { useTranslation } from 'react-i18next';
import setLanguage from 'src/utils/setLanguage';
import useComponentWillMount from 'src/hooks/useComponentWillMount';

import Layout from 'src/components/Layout';
import LostPassword from 'src/components/LostPassword/LostPassword';

function LostPasswordPage() {
  const location = useLocation();
  const [t, i18n] = useTranslation();
  useComponentWillMount(() => {setLanguage(location.pathname, i18n)});
  return (
    <Layout>
      <Helmet>
        <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
      </Helmet>
      <LostPassword />
    </Layout>
  )
}


export default LostPasswordPage;
