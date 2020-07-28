// src/utils/auth.js
import auth0 from "auth0-js"
import { navigate } from "gatsby"
import i18next from 'i18next'

export const isBrowser = typeof window !== "undefined"

const databaseConnection = 'Username-Password-Authentication';

export const auth = isBrowser
  ? new auth0.WebAuth({
      domain: process.env.GATSBY_AUTH0_DOMAIN,
      clientID: process.env.GATSBY_AUTH0_CLIENTID,
      redirectUri: process.env.GATSBY_AUTH0_CALLBACK,
      responseType: "token id_token",
      scope: "openid profile email",
    })
  : {}

export let auth0Manage = null;

const goHome = () => navigate(`/${i18next.language === 'en' ? '' : i18next.language}`)

const tokens = {
  accessToken: false,
  idToken: false,
  expiresAt: false,
}

let user = {}


export const isAuthenticated = () => {
  if (!isBrowser) {
    return
  }

  return localStorage.getItem("isLoggedIn") === "true"
}

export const login = (username, password, setError) => {
  if (!isBrowser) {
    return
  }
  // auth.crossOriginVerification();
  auth.login({
    realm: databaseConnection,
    username,
    password,
  }, err => {
    const errorText = (err.description.rules && err.description.rules.length > 0 && err.description.rules[0].message) || err.description || '';
    setError(errorText);
  });
}

export const loginWithFacebook = (setError) => {
  if (!isBrowser) {
    return
  }
  auth.authorize({
      connection: 'facebook'
  }, err => {
    const errorText = (err.description.rules && err.description.rules.length > 0 && err.description.rules[0].message) || err.description || '';
    setError(errorText);
  });
}

export const signup = (email, password, firstname, lastname, country, city, receiveUpdates, receiveEmails, setError) => {
  if (!isBrowser) {
    return
  }
  auth.redirect.signupAndLogin({
      connection: databaseConnection,
      email: email,
      password: password,
      user_metadata: {
        firstname: firstname,
        lastname: lastname,
        country: country,
        city: city,
        // Auth0 doesn't to provide bool in signup user_metadata
        // if property is false, just set it empty
        receiveEmails: receiveEmails ? receiveEmails.toString() : '',
        receiveUpdates: receiveUpdates ? receiveUpdates.toString() : '',
      }
  }, err => {
    if(err) {
      const errorText = err.description && (err.description.rules && err.description.rules.length > 0 && err.description.rules[0].message) || err.description || '';
      setError(errorText);
    }
  });
}

export const resetPassword = (email, setEmailSentText) => {
  auth.changePassword({
    connection: databaseConnection,
    email,
  }, (err, res) => {
    if(res) {
      setEmailSentText(res);
    }
  });
}

const setSession = (cb = () => {}) => (err, authResult) => {
  if (err) {
    cb()
    return
  }

  if (authResult && authResult.accessToken && authResult.idToken) {
    if (!isBrowser) {
      return
    }


    let expiresAt = authResult.expiresIn * 1000 + new Date().getTime()

    tokens.accessToken = authResult.accessToken
    tokens.idToken = authResult.idToken
    tokens.expiresAt = expiresAt

    user = authResult.idTokenPayload

    setUserData(cb)
    
    localStorage.setItem("user", JSON.stringify(user))
    localStorage.setItem("isLoggedIn", true)

  }
}

export const silentAuth = callback => {
  if (!isAuthenticated()) return callback()


  // scopes will not work because consent required.

  // auth.checkSession({
  //   audience: 'https://tkdev.auth0.com/api/v2/',
  //   scope: 'openid email profile read:current_user',
  // }, setSession(callback));

  auth.checkSession({
    audience: process.env.GATSBY_AUTH0_AUDIENCE,
    scope: 'openid email profile',
  }, setSession(callback));

}

export const setUserData = (cb = () => {}) => {
  auth.checkSession({
    audience: process.env.GATSBY_AUTH0_AUDIENCE,
    scope: 'read:current_user update:current_user_metadata',
  }, (err, authResult) => {
    
    if(err) {
      cb();
      return;
    };
    auth0Manage = isBrowser ? new auth0.Management({
      domain: process.env.GATSBY_AUTH0_DOMAIN,
      token: authResult.accessToken,
    }) : null;
    if(!auth0Manage) {
      cb();
      return;
    }
    auth0Manage.getUser(authResult.idTokenPayload.sub, (err, result) => {
      if(result) {
        localStorage.setItem("user", JSON.stringify(result))
      }
      cb();
    });
  });
}

export const updateUserData = (userMetadata, cb) => {
  const user = getProfile();
  auth0Manage.patchUserMetadata(user.user_id, userMetadata, (err, result) => {
    if(!err && result) {
      localStorage.setItem('user', JSON.stringify(result));
    }
    if(cb) cb();
  });
}

export const handleAuthentication = () => {
  if (!isBrowser) {
    return
  }
  auth.parseHash(setSession(goHome))
}

export const getProfile = () => {
  if (!isBrowser) {
    return
  }

  return JSON.parse(localStorage.getItem("user"))
}

export const logout = () => {
  if (!isBrowser) {
    return
  }

  localStorage.setItem("isLoggedIn", false)
  auth.logout()
}
