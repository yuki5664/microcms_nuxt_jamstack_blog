<template>
  <div class="text-center">
    <v-pagination
      v-model="page"
      :length="4"
      @input = "getNumber"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
    ></v-pagination>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        page: 1,
      }
    },
    methods: {
      getNumber: function(number){
        console.log(number)
      }
    }
  }
</script>