export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'VH7',
    titleTemplate: '%s - VH7',
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
    baseURL: process.env.API_URL,
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
          authorization: 'https://auth.vh7.uk/oauth2/authorize',
          token: 'https://auth.vh7.uk/oauth2/token',
          userInfo: 'https://auth.vh7.uk/oauth2/userinfo',
          logout: 'https://auth.vh7.uk/oauth2/logout'
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
        clientId: '7fd54664-137e-4906-b2f7-7135a9a4fe10',
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
      name: 'VH7',
      theme_color: '#35dde8',
      ogType: 'website',
      ogHost: 'https://vh7.uk',
      ogImage: '/img/meta.png',
      ogUrl: 'https://vh7.uk',
      twitterCard: 'summary_large_image',
      twitterSite: 'https://vh7.uk',
      twitterCreator: '@_jakewalker1'
    },
    manifest: {
      name: 'VH7',
      short_name: 'VH7',
      background_color: '#121212'
    }
  }
}
