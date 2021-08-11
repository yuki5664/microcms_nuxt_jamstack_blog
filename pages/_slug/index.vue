<template>
  <v-app>
    <Header />
    <main class='main'>
      <h1 class="title">{{ title }}</h1>
      <p class="publishedAd">{{ publishedAt }}</p>
      <div class="post" v-html="body"></div>
    </main>
  </v-app>
</template>

<script>
import axios from 'axios'

export default {
  async asyncData({ params, $config }) {
    const { data } = await axios.get(
      `https://${$config.serviceId}.microcms.io/api/v1/blog/${params.slug}`,
      {
        headers: {'x-api-key': $config.apiKey }
      }
    )
    return data
  }
}
</script>
