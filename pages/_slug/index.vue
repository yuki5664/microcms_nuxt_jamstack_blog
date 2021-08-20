<template>
  <v-app>
    <Header />
    <v-main class="main">
      <v-container>
        <v-row>
          <picture v-if="ogimage" class="mx-auto">
            <source
              media="(min-width: 1160px)"
              type="image/webp"
              :srcset="`${ogimage.url}?w=820&fm=webp, ${ogimage.url}?w=1640&fm=webp 2x`"
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
        <h1 class="title">
          {{ title }}
        </h1>
        <p class="publishedAd">
          {{ publishedAt }}
        </p>
        <div class="post">
          <Post :body="body" />
        </div>
      </v-container>
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
    const headings = $('h1, h2, h3').toArray()
    const toc = headings.map((d) => {
      return {
        text: d.children[0].data,
        id: d.attribs.id,
        name: d.name,
      }
    })
    $('pre code').each((_, elm) => {
      const res = hljs.highlightAuto($(elm).text())
      $(elm).html(res.value)
      $(elm).addClass('hljs')
    })
    $('img').each((_, elm) => {
      $(elm).attr('class', 'lazyload')
      $(elm).attr('data-src', elm.attribs.src)
      $(elm).removeAttr('src')
    })
    return {
      ...data,
      body: $.html(),
      toc
    } 
  }
})
</script>
