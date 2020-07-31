import React from 'react';
import { Link } from 'gatsby';

import './AboutColumns.scss';
import { useTranslation } from 'react-i18next';

const AboutColumns = ({ columns }) => {
  const [t] = useTranslation();
  return (
    <div className="about-columns">
      <div className="info-blocks">
        
        {columns && columns.map(column => (
          <div className="info-block">
            {column.columnTitle && <h4 className="info-block__title">{column.columnTitle}</h4>}
            <div className="info-block__sections">
              {column.columnBlocks && column.columnBlocks.map(block => (
                <div className="info-block__section">
                  {block.columnBlockTitle && <div className="info-block__title__subtitle">{block.columnBlockTitle}</div>}
                  {block.columnBlockDescription && (
                    <div className="info-block__description">
                      {block.columnBlockDescription}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        ))}
    
        {/* <div className="info-block">
          <h4 className="info-block__title">{t('about-contacts')}</h4>
          <div className="info-block__sections">
            <div className="info-block__section">
              <div className="info-block__title__subtitle">{t('about-general')}</div>
              <div className="info-block__description">
                {t('about-general-text')}
              </div>
            </div>
            <div className="info-block__section">
              <div className="info-block__title__subtitle">{t('about-events')}</div>
              <div className="info-block__description">
                {t('about-events-text')}
              </div>
            </div>
            <div className="info-block__section">
              <div className="info-block__title__subtitle">{t('about-editorial')}</div>
              <div className="info-block__description">
                {t('about-editorial-text')}
              </div>
            </div>
            <div className="info-block__section">
              <div className="info-block__title__subtitle">{t('about-collaboration')}</div>
              <div className="info-block__description">
                {t('about-collaboration-text')}
              </div>
            </div>
            <div className="info-block__section">
              <div className="info-block__title__subtitle">{t('about-subscriptions')}</div>
              <div className="info-block__description">
                {t('about-subscriptions-text')}
              </div>
            </div>
          </div>
        </div>
    
    
        <div className="info-block desktop-only">
          <h4 className="info-block__title">Resources</h4>
          <div className="info-block__sections">
            <div className="info-block__section">
              <div className="info-block__title__subtitle">Media Kit</div>
              <div className="info-block__description">
                Please click this link to  download the Media Kit
              </div>
            </div>
          </div>
        </div>
    
        <div className="info-block desktop-only">
          <h4 className="info-block__title">Editorial Team</h4>
          <div className="info-block__editorial__block">
            <div>EDITOR-IN-CHIEF</div>
            <div className="info-block__editorial__block__name">
              Mark Hammons
            </div>
          </div>
          <div className="info-block__editorial__block">
            <div>EDITOR</div>
            <div className="info-block__editorial__block__name">
              Lorem Ipsum
            </div>
          </div>
          <div className="info-block__editorial__block">
            <div>ART DIRECTOR</div>
            <div className="info-block__editorial__block__name">
              Lorem Ipsum
            </div>
          </div>
          <div className="info-block__editorial__block">
            <div>COPY EDITOR</div>
            <div className="info-block__editorial__block__name">
              Lorem Ipsum
            </div>
          </div>
        </div>
    
        <div className="info-block desktop-only">
          <h4 className="info-block__title" />
          <div className="info-block__editorial__block">
            <div>{`SALES & DISTRIBUTION MANAGER`}</div>
            <div className="info-block__editorial__block__name">
              Lorem Ipsum
            </div>
          </div>
          <div className="info-block__editorial__block">
            <div>{`STUDIO & PROJECT MANAGER`}</div>
            <div className="info-block__editorial__block__name">
              Lorem Ipsum
            </div>
          </div>
          <div className="info-block__editorial__block">
            <div>DIGITAL MANAGER</div>
            <div className="info-block__editorial__block__name">
              Lorem Ipsum
            </div>
          </div>
          <div className="info-block__editorial__block">
            <div>{`STUDIO & PROJECT MANAGER`}</div>
            <div className="info-block__editorial__block__name">
              Lorem Ipsum
            </div>
          </div>
        </div>
    
        <div className="info-block desktop-only">
          <h4 className="info-block__title">Newsletter</h4>
          <div className="info-block__newsletter">
            <Link to="/login">Sign-up</Link> to the TK newsletter to get the first look at
            the new editorial issues and stay up to date with new stories.
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default AboutColumns;

