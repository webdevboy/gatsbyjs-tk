/* eslint jsx-a11y/anchor-is-valid: 0 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { SiteLogo } from 'src/svgs';
import { Link } from '@reach/router';
import { isAuthenticated } from 'src/utils/auth';

import MenusEn from './menus.en';
import MenusZh from './menus.zh';
import MenusZhTc from './menus.zh_tc';
import getLangLink from 'src/utils/getLangLink';
import Facebook from 'src/images/Facebook_icon_white.png';
import Instagram from 'src/images/Instagram_icon_white.png';
import WeChat from 'src/images/WeChat_icon_white.png';
import Weibo from 'src/images/Weibo_icon_white.png';
import './footer.scss';

function Footer() {
  const date = new Date();

  const { t, i18n } = useTranslation('footer');
  const getMenus = () => {
    if(!i18n.language) return null;
    switch(i18n.language.toLowerCase()) {
      case 'zh': {
        return <MenusZh />
      }
      case 'zh_tc': {
        return <MenusZhTc />
      }
      default: {
        return <MenusEn />
      }
    }
  }
  
  return (
    <footer className="footer">
      <div className="opt-in">
        <h2>{t('footer-optin-headline')}</h2>
        <p>{t('footer-optin-copy')}</p>
        <Link to={getLangLink(isAuthenticated() ? '/account' : '/login', i18n.language)}>{t('signup')}</Link>
      </div>
      <div className="site-links">
        <div className="tabs">
          <div className="tab">
            <input type="checkbox" id="chck1" />
            <label className="tab-label" htmlFor="chck1">
              {t('website')}
            </label>
            <div className="tab-content">
              {getMenus()}
            </div>
          </div>
          {/* <div className="tab">
            <input type="checkbox" id="chck2" />
            <label className="tab-label" htmlFor="chck2">
              {t('info')}
            </label>
            <div className="tab-content">
              <a href="#">{t('subscribe')}</a>
              <a href="#">{t('advertise-contact')}</a>
            </div>
          </div> */}
        </div>
        <div className="social-container">
          <ul>
            <li>
              <a href="https://www.instagram.com/tastingkitchen/" target="_blank">
                <img src={Instagram} alt="" />
              </a>
            </li>
            <li>
              <a href={`https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MjM5NzczOTE0NA==&scene=124#wechat_redirect`} target="_blank">
                <img src={WeChat} alt="" />
              </a>
            </li>
            <li>
              <a href="https://weibo.com/u/7399881035?is_all=1" target="_blank">
                <img src={Weibo} alt="" />
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/tastingkitchen/" target="_blank">
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
