<template>
  <v-app>
    <Header />
    <main class="main">
      <h1 class="title">
        {{ title }}
      </h1>
      <p class="publishedAd">
        {{ publishedAt }}
      </p>
      <div class="post"></div>
    </main>
  </v-app>
</template>

<script lang="ts">
import axios from 'axios'
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
    return data
  }
})
</script>
