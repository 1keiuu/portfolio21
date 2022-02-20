import { ArticleContent } from './@types/Article'

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
          'https://storage.googleapis.com/portfolio21-56e7e.appspot.com/ogp/thumb.png?authuser=1',
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
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://1k-cove.com',
    // 除外するpath
    exclude: [],
    // ルートを設定
    routes: ['/'],
  },
  robots: {
    UserAgent: '*',
    // クローリングしないパス
    Disallow: '',
    // sitemap.xmlのURL
    Sitemap: 'https://1k-cove.com/sitemap.xml',
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
    '@/plugins/v-click-outside.ts',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // '@nuxtjs/stylelint-module',
    '@nuxtjs/composition-api',
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
        defaultImage: '/lazy.webp',
      },
    ],
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
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
    SITE_URL: 'https://1k-cove.com',
    STORAGE_URL: process.env.STORAGE_URL,
    QIITA_API_KEY: process.env.QIITA_API_KEY,
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
  generate: {
    interval: 2000,
  },
  hooks: {
    'content:file:beforeInsert': async (document: ArticleContent) => {
      if (document.extension === '.md') {
        // reading timeの設定
        const { time } = require('reading-time')(document.text, {
          wordsPerMinute: 700,
        })
        document.readingTime = time
        // categoryの取得、設定
        const path = require('path')
        const { CategoryHook } = require(path.resolve(
          __dirname,
          './nuxt_content/hooks/CategoryHook.ts'
        ))
        const res = CategoryHook.getCategoryFromIds(document.category_ids)
        document.categories = res

        // ogpデータの取得、設定
        for (let i = 0; i < document.ogpURLs?.length; i++) {
          const { OGPHook } = require(path.resolve(
            __dirname,
            './nuxt_content/hooks/OGPHook.ts'
          ))
          const responseOgp = await OGPHook.getOGP(document.ogpURLs[i])
          document.ogps[i] = responseOgp
        }

        // templateの挿入
        // const { DOMParser } = require(path.resolve(
        //   __dirname,
        //   './nuxt_content/hooks/InsertArticleTemplate/DOMParser.js'
        // ))
        // const v = DOMParser.parse()
        // document.body.children.unshift(v)
        // if (document.slug === 'article-1') console.log(document.body.children)

        // v.children.each((a) => {
        //   document.body.children.unshift(v.children)
        // })
      }
    },
  },
}
