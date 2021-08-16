<template>
  <v-card>
    <v-card-title class="text-h5 mx-auto">カテゴリー</v-card-title>
    <v-list rounded>
      <v-list-item-group
        color="primary"
      >
      <v-list-item 
        v-for="category in categories" 
        :key="category.id" 
        class="list"
        :to="`/category/${category.id}/page/1`">
        {{ category.name }}
      </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
};
</script>