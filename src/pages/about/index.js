import React from 'react';
import { Link } from 'gatsby';
import Layout from 'src/components/Layout';
import { useTranslation } from 'react-i18next';

import 'src/styles/pages/about.scss';

const About = () => {
  const [t] = useTranslation('about');
  const title = 'About Tasting Kitchen';

  return (
    <Layout theme="light" title={t('about-title')}>
      <div className="about-page">
        <h1 className="about-headline">{t('about-title')}</h1>

        <div className="content-block-wrapper">
          <div className="content-block">
            <div className="img-wrapper">
              <img
                src="http://w0y.dd0.myftpupload.com/wp-content/uploads/2020/07/about-picture.jpg"
                alt="About"
              />
              <p className="cutline">{`${t('about-photography')} David Hartung`}</p>
            </div>
            <div className="copyblock">
              <p>
                {t('about-copyblock1')}
              </p>
              <p>
                {t('about-copyblock2')}
              </p>
              <p>
                {t('about-copyblock3')}
              </p>
              <p>
                {t('about-copyblock4')}
              </p>
            </div>
          </div>
        </div>
        <div className="info-blocks">
          <div className="info-block">
            <h4 className="info-block__title">{t('about-offices')}</h4>
            <div className="info-block__sections">
              <div className="info-block__section">
                <div className="info-block__title__subtitle">{t('about-shanghai')}</div>
                <div className="info-block__description">
                  {t('about-shanghai-text')}
                </div>
              </div>
              <div className="info-block__section">
                <div className="info-block__title__subtitle">{t('about-hong-kong')}</div>
                <div className="info-block__description">
                  {t('about-hong-kong-text')}
                </div>
              </div>
              <div className="info-block__section">
                <div className="info-block__title__subtitle">{t('about-macau')}</div>
                <div className="info-block__description">
                  {t('about-macau-text')}
                </div>
              </div>
            </div>
          </div>

          <div className="info-block">
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;

// Resources
// Editorial Team
// Newsletter signup only on mobile?
