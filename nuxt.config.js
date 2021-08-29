import axios from 'axios'

export default {
  publicRuntimeConfig: {
    apiKey: process.env.NODE_ENV !== 'production' ? process.env.API_KEY : undefined,
    serviceId: process.env.NODE_ENV !== 'production' ? process.env.SERVICE_ID : undefined,
  },
  privateRuntimeConfig: {
    apiKey: process.env.API_KEY,
    serviceId: process.env.SERVICE_ID,
  },
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        path: '/page/:p',
        component: resolve(__dirname, 'pages/index.vue'),
        name: 'page',
      })
      routes.push({
        path: '/category/:categoryId/page/:p',
        component: resolve(__dirname, 'pages/index.vue'),
        name: 'category',
      })
    },
  },
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'microcms-nuxt-jamstack-blog',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify'
  ],

  // setting typescript typecheck
  typescript: {
    typeCheck: {
      eslint: {
        files: './**/*.{ts,vue}',
      },
    },
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        'postcss-custom-properties': {
          preserve: false,
          importFrom: ['assets/styles/colors.css'],
        },
        'postcss-nested': {},
      },
    },
  },
    // extend(config, ctx) {
    //   // Run ESLint on save
    //   if (ctx.isDev && ctx.isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/,
    //     });
    //   }
    // },

  generate: {
    interval: 100,
    async routes() {
      const limit = 50
      const range = (start, end) =>
        [...Array(end - start + 1)].map((_, i) => start + i)

      // 詳細ページ
      const getArticles = (offset = 0) => {
        return axios
          .get(
            `https://${process.env.SERVICE_ID}.microcms.io/api/v1/blog?offset=${offset}&limit=${limit}&depth=2`,
            {
              headers: { 'X-API-KEY': process.env.API_KEY },
            }
          )
          .then(async (res) => {
            let articles = []
            if (res.data.totalCount > offset + limit) {
              articles = await getArticles(offset + limit)
            }
            return [
              ...res.data.contents.map((content) => ({
                route: `/${content.id}`,
              })),
              ...articles,
            ]
          })
      }
      const articles = await getArticles()

      // 一覧のページング
      const pages = await axios
        .get(`https://${process.env.SERVICE_ID}.microcms.io/api/v1/blog?limit=0`, {
          headers: { 'X-API-KEY': process.env.API_KEY },
        })
        .then((res) =>
          range(1, Math.ceil(res.data.totalCount / limit)).map((p) => ({
            route: `/page/${p}`,
          }))
        )

        const categories = await axios
        .get(`https://${process.env.SERVICE_ID}.microcms.io/api/v1/categories?fields=id`, {
          headers: { 'X-API-KEY': process.env.API_KEY },
        })
        .then(({ data }) => {
          return data.contents.map((content) => content.id)
        })

        // カテゴリーページのページング
        const categoryPages = await Promise.all(
          categories.map((category) =>
            axios.get(
              `https://${process.env.SERVICE_ID}.microcms.io/api/v1/blog?limit=0&filters=category[equals]${category}`,
              { headers: { 'X-API-KEY': process.env.API_KEY } }
            )
              .then((res) =>
              range(1, Math.ceil(res.data.totalCount / 10)).map((p) => ({
              route: `/category/${category}/page/${p}`,
              })))
        )
      )

      // 2次元配列になってるのでフラットにする
      const flattenCategoryPages = [].concat.apply([], categoryPages)
      return [...pages, ...flattenCategoryPages, ...articles]
    },
    dir: 'dist'
  },
}