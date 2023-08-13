import { OpenloginAdapterOptions } from '@web3auth/openlogin-adapter';

export const getOpenloginAdapterConfig = (options?: 
  {
    signature?: string, 
    jwt?: {verifier?: string | null}, 
    auth0?: {verifier?: string | null, clientId?: string},
    adapterSettings?: OpenloginAdapterOptions['adapterSettings']
  }) => {
  const auth0 = options?.auth0
  const jwt = options?.jwt
  const signature = options?.signature
  const loginConfig = {
    twitch: {
      clientId: process.env.REACT_APP_ZEROKIT_TWITCH_CLIENT_ID ?? 'vidpa4wsenhzfy8h5qak0wznqckmjn',
      name: 'Twitch',
      typeOfLogin: 'twitch',
      'verifier': 'zerokit-twitch'
    },
    google: {
      clientId: process.env.REACT_APP_ZEROKIT_GOOGLE_CLIENT_ID ?? '858644905236-j3v174qpg83pt1nkhb861l9up8762gnh.apps.googleusercontent.com',
      name: 'Google',
      typeOfLogin: 'google',
      verifier: 'zerokit-google',
    },
    facebook: {
      clientId: process.env.REACT_APP_ZEROKIT_FACEBOOK_CLIENT_ID ?? '735339824616125',
      name: 'Facebook',
      typeOfLogin: 'facebook',
      verifier: 'zerokit-facebook',
    },
    twitter: {
      clientId: process.env.REACT_APP_ZEROKIT_TWITTER_CLIENT_ID ?? 'bjt1MzABwIvAYl3oWYmffTqw1eKqP3sH',
      name: 'Twitter',
      typeOfLogin: 'twitter',
      verifier: 'zerokit-twitter2',
      jwtParameters: {
        domain: process.env.REACT_APP_ZEROKIT_TWITTER_DOMAIN ?? 'https://zerokit.us.auth0.com',
        verifierIdField: "sub",
      },
    },
    github: {
      clientId: process.env.REACT_APP_ZEROKIT_GITHUB_CLIENT_ID ?? 'bjt1MzABwIvAYl3oWYmffTqw1eKqP3sH',
      name: 'Github',
      typeOfLogin: 'github',
      verifier: 'zerokit-github',
      jwtParameters: {
        domain: process.env.REACT_APP_ZEROKIT_GITHUB_DOMAIN ?? 'https://zerokit.us.auth0.com',
        verifierIdField: "sub",
      },
    },
    discord: {
      clientId: process.env.REACT_APP_ZEROKIT_DISCORD_CLIENT_ID ?? '1072625703675236412',
      name: 'Discord',
      typeOfLogin: 'discord',
      verifier: 'zerokit-discord',
    },
  } as {[key: string]: any}

  if (auth0) {
    loginConfig['auth0'] = {
      typeOfLogin: 'jwt',
      clientId: auth0.clientId,
      verifier: auth0.verifier,
    }
  }
  if (jwt) {
    loginConfig['jwt'] = {
      typeOfLogin: 'jwt',
      clientId: 'random',
      verifier: jwt.verifier,
    }
  }
  return ({
      ...(signature && window ? {
        originData: {
          [window.location.origin]: signature
        }
      } : {}),
      loginConfig,
      network: process.env.REACT_APP_ZEROKIT_WEB3AUTH_NETWORK ?? 'cyan',
      ...options?.adapterSettings
  }) as OpenloginAdapterOptions['adapterSettings']
};