<template>
  <v-container>
    <h2 class="pageTitle">関連記事</h2>
      <v-card v-for="blog in blogs" :key="blog.id" class="mb-6 hover">
        <nuxt-link :to="`/${blog.id}`" class="c-p" tag="dev">
          <v-container>
            <v-row>
              <v-col cols="4">
                <picture>
                  <source
                    type="image/webp"
                    :data-srcset="blog.ogimage.url + '?w=820&fm=webp'"
                  />
                  <img
                    :src="blog.ogimage.url + '?w=820'"
                    class="img lazyload"
                    alt
                  />
                </picture>
              </v-col>
                <v-col cols="8">
                  <v-card-title>
                    {{ blog.title }}
                  </v-card-title>
                </v-col>
              </v-row>
                <!-- <Meta
                  :created-at="blog.createdAt"
                  :category="blog.category"
                /> -->
          </v-container>
        </nuxt-link>
      </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    blogs: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
})
</script>

<style scoped>
.hover:hover {
    transition: .3s;
    opacity: 0.5;
  }

@media (min-width: 1160px) {
  .pageTitle {
    font-size: 20px;
    font-weight: bold;
    background-color: #eee;
    padding: 6px 10px;
    margin: 60px 0 40px;
    border-radius: 5px;
  }

  .img {
    width: 340px;
    height: 178px;
    border-radius: 5px 5px 0 0;
  }
}
@media (min-width: 820px) and (max-width: 1160px) {

  .pageTitle {
    font-size: 20px;
    font-weight: bold;
    background-color: #eee;
    padding: 6px 10px;
    margin: 60px 0 40px;
    border-radius: 5px;
  }

  .img {
    width: 300px;
    height: 157px;
    border-radius: 5px 5px 0 0;
  }
}

@media (max-width: 820px) {
  .pageTitle {
    font-size: 20px;
    font-weight: bold;
    background-color: #eee;
    padding: 6px 10px;
    margin: 40px 0 20px;
    border-radius: 5px;
  }

  .img {
    width: 100%;
    border-radius: 5px;
  }
}
</style>