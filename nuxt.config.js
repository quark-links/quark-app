export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Quark',
    titleTemplate: '%s - Quark',
    meta: [
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~plugins/filters.ts',
    '~plugins/highlight.ts'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    ['@nuxtjs/dotenv', {}]
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next'
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: process.env.QUARK_API_URL,
    progress: true,
    retry: true
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true //,
      // themes: {
      //   dark: {
      //     primary: colors.blue.darken2,
      //     accent: colors.grey.darken3,
      //     secondary: colors.amber.darken3,
      //     info: colors.teal.lighten1,
      //     warning: colors.amber.base,
      //     error: colors.deepOrange.accent4,
      //     success: colors.green.accent3
      //   }
      // }
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },

  auth: {
    strategies: {
      oauth: {
        scheme: 'oauth2',
        endpoints: {
          authorization: process.env.QUARK_OAUTH__AUTHORIZATION,
          token: process.env.QUARK_OAUTH__TOKEN,
          userInfo: process.env.QUARK_OAUTH__USER_INFO,
          logout: process.env.QUARK_OAUTH__LOGOUT
        },
        token: {
          property: 'access_token',
          type: 'Bearer',
          maxAge: 1800
        },
        refreshToken: {
          property: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30
        },
        responseType: 'token id_token',
        grantType: 'authorization_code',
        clientId: process.env.QUARK_OAUTH__CLIENT_ID,
        scope: ['openid', 'offline_access']
      }
    }
  },

  pwa: {
    icon: {
      fileName: 'icon.png'
    },
    meta: {
      mobileApp: true,
      mobileAppIOS: true,
      appleStatusBarStyle: 'black',
      name: process.env.QUARK_INSTANCE__NAME || 'Quark',
      theme_color: '#35dde8',
      ogType: 'website',
      ogHost: process.env.QUARK_INSTANCE__URL || 'https://quark.example',
      ogImage: '/img/meta.png',
      ogUrl: process.env.QUARK_INSTANCE__URL || 'https://quark.example',
      twitterCard: 'summary_large_image',
      twitterSite: process.env.QUARK_INSTANCE__URL || 'https://quark.example'
    },
    manifest: {
      name: process.env.QUARK_INSTANCE__NAME || 'Quark',
      short_name: process.env.QUARK_INSTANCE__NAME || 'Quark',
      background_color: '#121212'
    }
  }
}
