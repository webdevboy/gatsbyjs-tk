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
          <div className="not-found__modal-body__aplogize">
            {t('not-found-aplogize')}
          </div>
          <div className="not-found__modal-body__title">
            {t('not-found-title')}
          </div>
          <div className="not-found__modal-body__description">
            {t('not-found-description')}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound;
