// ./gatsby-browser.js
import React from "react";
import { silentAuth } from "./src/utils/auth";
import { globalHistory } from '@reach/router';
import i18next from 'i18next';

import SmoothScroll from './src/utils/smoothScroll';

import i18n from "./src/i18n";
import converLinkLocale from './src/utils/convertLinkLocale';
import supportedLngs from 'src/locales/supportedLngs';
import { MEDIUM_BREAKPOINT } from './src/utils/breakpoints';
import CookiesPolicy from './src/components/CookiesPolicy/CookiesPolicy';
// import SmoothScroll from 'src/utils/smoothScroll';

const LanguageWrapper = ({ children }) => (
  <div id="main-wrapper">
    {children}
  </div>
)


class SessionCheck extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }

    this.handleCheckSession = this.handleCheckSession.bind(this)
  }

  handleCheckSession = () => {
    this.setState({ loading: false })
  }

  UNSAFE_componentWillMount() {
    if(typeof window !== undefined) {
      globalHistory.listen(({ action }) => {
        if(action === 'PUSH') {
          const { pathname } = window.location;
          const pageLngCode = pathname.split('/')[1] === '' ? 'en' : pathname.split('/')[1];
          const lngCode = supportedLngs.find(lng => lng === pageLngCode) || 'en';
          i18next.changeLanguage(lngCode);
        }
      });
    }

    // Set user pref language
    if(typeof window !== undefined && globalHistory.location.pathname.indexOf(i18next.language) == -1 && globalHistory.location.pathname.indexOf('callback') == -1 && i18next.language !== 'en') {
      window.location.pathname = converLinkLocale(globalHistory.location.pathname, i18next.language);
    }
  }

  componentDidMount() {  
    silentAuth(this.handleCheckSession);
    if(typeof window !== "undefined" && window.innerWidth > MEDIUM_BREAKPOINT) {
      SmoothScroll({
        animationTime: 1600,
        stepSize: 200,

        accelerationDelta: 20,
        accelerationMax: 1,

        pulseAlgorithm   : true,
        pulseScale       : 3,
        pulseNormalize   : 1,
      });
    }
  }
  render() {
    return (
      !this.state.loading && (
        <React.Fragment>
          <LanguageWrapper>
            {this.props.children}
          </LanguageWrapper>
          {/* <CookiesPolicy /> */}
        </React.Fragment>
      )
    )
  }
}

export const wrapRootElement = ({ element }) => {
  return (
    <SessionCheck>
      {element}
    </SessionCheck>
  )
}
