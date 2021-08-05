<template>
  <v-app>
    <Header />
    <v-main>
      <v-container>
        <v-parallax 
        :src="require('@/assets/surf.png')"
        class="bg"></v-parallax>
        <v-row>
          <h1 class="text-h2 mb-4 mt-12 mx-auto">MY BLOG</h1>
        </v-row>
        <div v-show="contents.length === 0" class="loader">
            記事がありません
        </div>
        <v-card 
        v-for="content in contents" 
        :key="content.id"
        class="mx-auto my-6"
        max-width="800">
          <nuxt-link 
          :to="`/${content.id}`"
          tag="div"
          class="c-p"> 
            <v-container :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }">
              <p> {{ content.publishedAt | dateFilter }} </p>
              <v-row>
                <v-col cols="4">
                  <v-img
                    :src="content.ogimage.url"
                    class="ogimage m-6"
                    max-height="100"
                    max-width="200"
                    alt=""
                  />
                </v-col>
                <v-col cols="8">
                  <v-card-title>
                    {{ content.title }}
                  </v-card-title>
                </v-col>
              </v-row>
            </v-container>
          </nuxt-link>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
  async asyncData( {$config } ) {
    const { data } = await axios.get(
      'https://nuxt-tutorial-blog.microcms.io/api/v1/blog',
      {
        headers: {'X-API-KEY': $config.apiKey }
      }
    )
    return data
  },
  filters: {
    dateFilter: function(date) {
      return moment(date).format('YYYY/MM/DD')
    }
  }
}
</script>