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
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  generate: {
    async routes() {
      const limit = 10
      const range = (start, end) =>
        [...Array(end - start + 1)].map((_, i) => start + i)

      // 一覧のページング
      const pages = await axios
        .get(`https://your-service-id.microcms.io/api/v1/blog?limit=0`, {
          headers: { 'X-API-KEY': API_KEY },
        })
        .then((res) =>
          range(1, Math.ceil(res.data.totalCount / limit)).map((p) => ({
            route: `/page/${p}`,
          }))
        )

        const categories = await axios
        .get(`https://your-service-id.microcms.io/api/v1/categories?fields=id`, {
          headers: { 'X-API-KEY': 'your-api-key' },
        })
        .then(({ data }) => {
          return data.contents.map((content) => content.id)
        })

        // カテゴリーページのページング
        const categoryPages = await Promise.all(
          categories.map((category) =>
            axios.get(
              `https://your-service-id.microcms.io/api/v1/blog?limit=0&filters=category[equals]${category}`,
              { headers: { 'X-API-KEY': 'your-api-key' } }
            )
              .then((res) =>
              range(1, Math.ceil(res.data.totalCount / 10)).map((p) => ({
              route: `/category/${category}/page/${p}`,
              })))
        )
      )

      // 2次元配列になってるのでフラットにする
      const flattenCategoryPages = [].concat.apply([], categoryPages)
      return [...pages, ...flattenCategoryPages]
    },
  },
}