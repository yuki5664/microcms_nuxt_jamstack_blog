<template>
  <v-app>
    <Header />
    <v-main>
      <v-container>
        <v-parallax 
          src="/images/surf.png"
          class="bg"
        ></v-parallax>
        <v-row>
          <h1 class="text-h2 mb-4 mt-12 mx-auto">
            MY BLOG
          </h1>
        </v-row>
        <div v-show="contents.length === 0" class="loader">
          記事がありません
        </div>
        <v-row class="my-6">
          <v-col cols="12" sm="9">
            <v-card
              v-for="content in contents"
              :key="content.id"
              class="mx-auto mb-6 hover"
              max-width="800"
            >
              <nuxt-link
                :to="`/${content.id}`"
                tag="div"
                class="c-p"
              >
                <v-container>
                  <Meta 
                    :created-at="content.publishedAt || content.createdAt"
                    :category="content.category"
                  />
                  <v-row>
                    <v-col cols="12" sm="4">
                      <picture v-if="content.ogimage">
                        <!-- <v-img
                          :src="content.ogimage.url"
                          class="ogimage m-6"
                          max-height="100"
                          max-width="200"
                          alt=""
                        /> -->
                        <source
                          media="(min-width: 1160px)"
                          type="image/webp"
                          :srcset="`${content.ogimage.url}?w=400&fm=webp, ${content.ogimage.url}?w=400&fm=webp 2x`"
                        />
                        <source
                          media="(min-width: 820px)"
                          type="image/webp"
                          :srcset="`${content.ogimage.url}?w=400&fm=webp, ${content.ogimage.url}?w=400&fm=webp 2x`"
                        />
                        <source
                          media="(min-width: 768px)"
                          type="image/webp"
                          :srcset="`${content.ogimage.url}?w=350&fm=webp, ${content.ogimage.url}?w=350&fm=webp 2x`"
                        />
                        <source
                          media="(max-width: 768px)"
                          type="image/webp"
                          :srcset="`${content.ogimage.url}?w=375&fm=webp, ${content.ogimage.url}?w=600&fm=webp 2x`"
                        />
                        <img
                          ref="ogimage"
                          :src="content.ogimage.url + '?w=820&q=100'"
                          class="ogimage"
                          alt
                        />
                      </picture>
                    </v-col>
                    <v-col cols="12" sm="8">
                      <v-card-title>
                        {{ content.title }}
                      </v-card-title>
                      <v-card-text>
                        {{ content.description}}
                      </v-card-text>
                    </v-col>
                  </v-row>
                </v-container>
              </nuxt-link>
            </v-card>
            <Pagination
              :contents="contents"
              :pager="pager"
              :current="Number(page)"
              :category="selectedCategory"
            />
          </v-col>
          <v-col cols="12" sm="3">
            <aside>
              <Categories :categories="categories" />
            </aside>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import axios from 'axios'
import Vue from 'vue'
import { Context } from '@nuxt/types'

export default Vue.extend({
  async asyncData({params, $config}: Context) {
    const page: any = params.p || '1'
    const categoryId = params.categoryId
    const limit = 10
    const { data } = await axios.get(
      `https://${$config.serviceId}.microcms.io/api/v1/blog?limit=${limit}${
        categoryId === undefined ? '' : `&filters=category[equals]${categoryId}`
      }&offset=${(page - 1) * limit}`,
      {
        headers: {'X-API-KEY': $config.apiKey }
      }
    )
    const categories = await axios.get(
      `https://${$config.serviceId}.microcms.io/api/v1/categories?limit=100`,
      {
        headers: { 'X-API-KEY': $config.apiKey },
      }
    )
    const selectedCategory =
      categoryId !== undefined
        ? categories.data.contents.find((content: any) => content.id===categoryId)
        : undefined
    return {
      ...data,
      categories: categories.data.contents,
      selectedCategory,
      page,
      // 最大のページ数を取得
      pager: [...Array(Math.ceil(data.totalCount / limit)).keys()],
    }
  },
  data() {
    return {
      contents: (this as any).contents || [],
      totalCount: (this as any).totalCount || 0,
      pager: (this as any).pager || [],
    }
  }
})
</script>

<style scoped>
  .hover:hover {
    transition: .3s;
    opacity: 0.5;
  }
</style>