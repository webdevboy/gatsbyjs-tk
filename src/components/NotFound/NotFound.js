import React from 'react';
import { useTranslation } from "react-i18next";

import './NotFound.scss';
import NotFoundBackground from 'src/images/NotFound-background.jpg';

const NotFound = () => {
  const [t] = useTranslation('notFound');
  return (
    <div className="not-found" style={{ backgroundImage: `url('${NotFoundBackground}')` }}>
      <div className="not-found__modal">
        <div className="not-found__modal-body">
          <p className="not-found__modal-body__aplogize">
            {t('not-found-aplogize')}
          </p>
          <h1 className="not-found__modal-body__title">
            {t('not-found-title')}
          </h1>
          <p className="not-found__modal-body__description">
            {t('not-found-description')}
          </p>
        </div>
      </div>
    </div>
  )
}

export default NotFound;
