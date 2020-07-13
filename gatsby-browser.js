// ./gatsby-browser.js
import React from "react";
import { silentAuth } from "./src/utils/auth";
import { globalHistory } from '@reach/router';
import i18next from 'i18next';
import SmoothScroll from 'smoothscroll-for-websites';

import i18n from "./src/i18n";
import converLinkLocale from './src/utils/convertLinkLocale';

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

  componentDidMount() {
    silentAuth(this.handleCheckSession);
    SmoothScroll();

    i18next.on('languageChanged', function(lng) {
      window.location.pathname = converLinkLocale(globalHistory.location.pathname, lng);
    });

    // Set user pref language
    if(window && globalHistory.location.pathname.indexOf(i18next.language) == -1 && globalHistory.location.pathname.indexOf('callback') == -1 && i18next.language !== 'en') {
      window.location.pathname = converLinkLocale(globalHistory.location.pathname, i18next.language);
    }
  }
  render() {
    return (
      !this.state.loading && (
        <React.Fragment>
          <LanguageWrapper>
            {this.props.children}
          </LanguageWrapper>
        </React.Fragment>
      )
    )
  }
}

export const wrapRootElement = ({ element }) => {
  return <SessionCheck>{element}</SessionCheck>
}
