<template>
  <p>
    {{ createdAt | dateFilter }}
    <span v-if="category" class="category">{{ category.name }}</span>
  </p>
</template>

<script lang="ts">
import Vue from 'vue'
import moment from 'moment'
export default Vue.extend({
  filters: {
    dateFilter(props: any): any {
      return moment(props).format('YYYY/MM/DD')
    }
  },
  props: {
    createdAt: {
      type: String,
      required: true,
    },
    category: {
      type: Object,
      required: false,
      default: undefined,
    },
  },
})
</script>

<style scoped>
  .category {
    display: inline-block;
    padding: 2px 8px;
    border: 1px solid #331cbf;
    color: #331cbf;
    white-space: nowrap;
    border-radius: 3px;
    font-size: 14px;
    margin: 10px 10px 2px;
  }
</style>