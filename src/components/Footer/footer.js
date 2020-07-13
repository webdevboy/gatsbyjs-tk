/* eslint jsx-a11y/anchor-is-valid: 0 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { SiteLogo } from 'src/svgs';
import { Link } from '@reach/router';

import getLangLink from 'src/utils/getLangLink';
import Facebook from 'src/images/Facebook_icon_gray.png';
import Instagram from 'src/images/Instagram_icon_gray.png';
import WeChat from 'src/images/WeChat_icon_gray.png';
import Weibo from 'src/images/Weibo_icon_gray.png';
import './footer.scss';

function Footer() {
  const date = new Date();

  const { t, i18n } = useTranslation('footer');
  return (
    <footer className="footer">
      <div className="opt-in">
        <h2>{t('footer-optin-headline')}</h2>
        <p>{t('footer-optin-copy')}</p>
        <Link to={getLangLink('/login', i18n.language)}>{t('signup')}</Link>
      </div>
      <div className="site-links">
        <div className="tabs">
          <div className="tab">
            <input type="checkbox" id="chck1" />
            <label className="tab-label" htmlFor="chck1">
              {t('website')}
            </label>
            <div className="tab-content">
              <a href="#">{t('terms')}</a>
              <a href="#">{t('faqs')}</a>
            </div>
          </div>
          <div className="tab">
            <input type="checkbox" id="chck2" />
            <label className="tab-label" htmlFor="chck2">
              {t('info')}
            </label>
            <div className="tab-content">
              <a href="#">{t('subscribe')}</a>
              <a href="#">{t('advertise-contact')}</a>
            </div>
          </div>
        </div>
        <div className="social-container">
          <ul>
            <li>
              <a href="https://www.instagram.com/tastingkitchen">
                <img src={Instagram} alt="" />
              </a>
            </li>
            <li>
              {/* TODO: Get URL for Pinterest */}
              <img src={WeChat} alt="" />
            </li>
            <li>
              <img src={Weibo} alt="" />
            </li>
            <li>
              <a href="https://www.facebook.com/tastingkitchen/">
                <img src={Facebook} alt="" />
              </a>
            </li>
          </ul>
        </div>
        <p className="about">{t('footer-about')}</p>
        <div className="logo">
          <SiteLogo fill="white" />
          <span>TASTING KITCHEN</span>
        </div>
        <p className="copyright">
          &copy; {date.getFullYear()} Tasting Kitchen. All Rights Reserved
        </p>
      </div>
    </footer>
  );
}

export default Footer;
