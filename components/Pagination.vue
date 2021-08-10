<template>
  <div v-if="contents.length > 10" class="wrapper">
    <div class="pager">
      <v-btn v-if="current > 1" class="page">
        <nuxt-link
          :to="`/${
            category !== undefined ? `category/${category.id}/` : ''
          }page/${current - 1}`"
          tag="div"
          class="c-p">
          <v-icon size="18" alt="前のページへ">mdi-arrow-left</v-icon>
        </nuxt-link>
      </v-btn>
        <nuxt-link
          :to="`/${
            category !== undefined ? `category/${category.id}/` : ''
          }page/1`"
          tag="div"
          class="c-p">
          <v-btn v-if="3 < current" class="page">
            1
          </v-btn>
        </nuxt-link>
      <div v-if="4 < current" class="omission">
        ...
      </div>
      
      <div
      v-for="p in pager"
      v-show="current - 3 <= p && p <= current + 1"
      :key="p"
      class="page"
      :class="{ active: current === p + 1 }">
        <nuxt-link
        :to="`/${
          category !== undefined ? `category/${category.id}/` : ''
        }page/${p + 1}`"
        tag="div"
        class="c-p">
          <v-btn>
            {{ p + 1 }}
          </v-btn>
        </nuxt-link>
      </div>
      <div v-if="current + 3 < pager.length" class="omission">
        ...
      </div>
      <nuxt-link
        :to="`/${
          category !== undefined ? `category/${category.id}/` : ''
        }page/${pager.length}`"
        tag="div"
        class="c-p">
        <v-btn v-if="current + 2 < pager.length" class="page">
          {{ pager.length }}
        </v-btn>
      </nuxt-link>
      <nuxt-link
        :to="`/${
          category !== undefined ? `category/${category.id}/` : ''
        }page/${current + 1}`"
        tag="div"
        class="c-p">
        <v-btn v-if="current < pager.length" class="page arrow">
          <v-icon size="18" alt="次のページへ">mdi-arrow-right</v-icon>
        </v-btn>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    contents: {
      type: Array,
      required: false,
      default: () => [],
    },
    pager: {
      type: Array,
      required: false,
      default: () => [],
    },
    current: {
      type: Number,
      required: true,
    },
    category: {
      type: Object,
      required: false,
      default: undefined,
    },
  },
};
</script>

<style scoped>
.wrapper {
  padding: 16px 0;
}

.pager {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 40px 0 0;
}

.page {
  margin: 4px;
  }

.c-p {
  cursor: pointer;
}

</style>