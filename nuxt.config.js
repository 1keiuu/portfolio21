const envPath = 'config/.env'
require('dotenv').config({ path: envPath })
export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',
  server: {
    port: 3300,
  },
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "1keiuu's portfolio",
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: "Ikkei Harashima's Portfolio",
      },
      {
        hid: 'og:site_name',
        name: 'og:site_name',
        content: "1keiuu's portfolio",
      },
      { hid: 'og:type', name: 'og:type', content: 'website' },
      { hid: 'og:url', name: 'og:url', content: 'サイトのURL' },
      {
        hid: 'og:description',
        name: 'og:description',
        content: "Ikkei Harashima's portfolio 2021",
      },
      {
        hid: 'og:image',
        name: 'og:image',
        content:
          'https://storage.googleapis.com/portfolio21-56e7e.appspot.com/ogp/base.png?authuser=1',
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: "1keiuu's portfolio",
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: "Ikkei Harashima's Portfolio",
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      { hid: 'twitter:site', name: 'twitter:site', content: '@1keiuu' },
    ],
    htmlAttrs: { lang: 'ja' },
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    { src: '~/assets/scss/global.scss', lang: 'scss' },
    { src: '~/assets/scss/variables.scss', lang: 'scss' },
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/composition-api',
    '@/plugins/axios',
    '@/plugins/vue-awesome-swiper',
    '@/plugins/vue-scrollto',
    '@/plugins/firebase',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxt/content',
    '@nuxtjs/dayjs',
    '@nuxtjs/style-resources',
    [
      'nuxt-lazy-load',
      {
        defaultImage: '/lazy_thin.png',
      },
    ],
  ],
  styleResources: {
    scss: ['@/assets/scss/utilities.scss', '@/assets/scss/variables.scss'],
  },
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},
  content: {
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-material-oceanic.css',
      },
    },
  },
  dayjs: {
    locales: ['en', 'ja'],
    defaultLocale: 'ja',
  },
  dotenv: {
    filename: envPath,
  },
  // NOTE: Firebase Hostingではenvが設定できない(?)のでfunctions等を利用する必要がある
  env: {
    SITE_URL: process.env.SITE_URL,
    STORAGE_URL: process.env.STORAGE_URL,
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
  generate: {
    async routes() {
      const { $content } = require('@nuxt/content')
      const files = await $content().only(['path']).fetch()

      return files.map((file) => (file.path === '/index' ? '/' : file.path))
    },
  },
  hooks: {
    'content:file:beforeInsert': async (document) => {
      if (document.extension === '.md') {
        const { time } = require('reading-time')(document.text, {
          wordsPerMinute: 700,
        })

        document.readingTime = time
        if (!document.ogpURLs) return
        for (let i = 0; i < document.ogpURLs.length; i++) {
          const url = document.ogpURLs[i]
          const ogp = {
            title: 'OGP',
            description: 'fetching data... \n Please wait for a while.',
            image: '/lazy_thin.png',
          }
          const axios = require('axios')
          if (!url) return
          await axios
            .post(
              'https://asia-northeast1-portfolio21-56e7e.cloudfunctions.net/getOgpInfo',
              { url },
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            )
            .then((res) => {
              ogp.image = res.data.ogp.image
              ogp.description = res.data.ogp.description
              ogp.title = res.data.ogp.title
              ogp.url = url
            })
            .catch((e) => console.error(e))
          document.ogps[i] = ogp
        }
      }
    },
  },
}
