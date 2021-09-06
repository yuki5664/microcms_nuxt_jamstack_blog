<template>
  <v-app>
    <Header />
    <v-main class="main">
      <v-container>
        <v-row>
          <p class="text-h5 mb-4 mt-12 mx-auto">
            <Meta 
              :created-at="publishedAt || blog.createdAt"
              :category="category"
            />
          </p>
        </v-row>
        <v-row>
          <h1 class="mb-4 mx-auto">
            {{ title }}
          </h1>
        </v-row>
        <v-row>
          <picture v-if="ogimage" class="mx-auto">
            <source
              media="(min-width: 1160px)"
              type="image/webp"
              :srcset="`${ogimage.url}?w=820&fm=webp, ${ogimage.url}?w=2000&fm=webp 2x`"
            />
            <source
              media="(min-width: 820px)"
              type="image/webp"
              :srcset="`${ogimage.url}?w=740&fm=webp, ${ogimage.url}?w=1480&fm=webp 2x`"
            />
            <source
              media="(min-width: 768px)"
              type="image/webp"
              :srcset="`${ogimage.url}?w=728&fm=webp, ${ogimage.url}?w=1456&fm=webp 2x`"
            />
            <source
              media="(max-width: 768px)"
              type="image/webp"
              :srcset="`${ogimage.url}?w=375&fm=webp, ${ogimage.url}?w=750&fm=webp 2x`"
            />
            <img
              ref="ogimage"
              :src="ogimage.url + '?w=820&q=100'"
              class="ogimage"
              alt
            />
          </picture>
        </v-row>
        <div class="post">
          <Post :body="body" />
          <RelatedBlogs
            v-if="related_blogs.length > 0"
            :blogs="related_blogs"
          />
        </div>
      </v-container>
      <Footer />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import axios from 'axios'
import cheerio from 'cheerio'
import hljs from 'highlight.js'
import Vue from 'vue'
import { Context } from '@nuxt/types'

export default Vue.extend({
  async asyncData({ params, $config }: Context) {
    const { data } = await axios.get(
      `https://${$config.serviceId}.microcms.io/api/v1/blog/${params.slug}`,
      {
        headers: {'x-api-key': $config.apiKey }
      }
    )
    const $ = cheerio.load(data.body)
    // const headings = $('h1, h2, h3').toArray()
    // const toc = headings.map((d) => {
    //   return {
    //     text: d.children[0].data,
    //     id: d.attribs.id,
    //     name: d.name,
    //   }
    // })
    // TODO: highlight.jsが機能するようにする
    $('pre code').each((_, elm) => {
      const res = hljs.highlightAuto($(elm).text())
      $(elm).html(res.value)
      $(elm).addClass('hljs')
    })
    $('img').each((_, elm) => {
      $(elm).attr('class', 'lazyload')
      $(elm).attr('data-src', elm.attribs.src)
      // $(elm).removeAttr('src') //画像が反映されないので一時的にコメントアウト
    })
    return {
      ...data,
      body: $.html(),
    } 
  }
})
</script>

<style scoped>
@media (min-width: 600px) {
  h1 { 
    font-size: 34px;
  }
}

@media (max-width: 600px) {
  h1 { 
    font-size: 22px;
  }
}

</style>
