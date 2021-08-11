<template>
  <v-app-bar
    app
    color="white"
    flat
  >
    <img src="/images/title_logo.png" alt="" width="120" height="100" class="mt-10">
    <v-tabs
      centered
      class="ml-n9"
      color="grey darken-1"
    >
      <v-tab
        v-for="link in links"
        :key="link"
      >
        {{ link }}
      </v-tab>
    </v-tabs>
    <a href="https://twitter.com/tanayu7777" target="_blank">
      <v-btn icon class="mr-2">
        <v-icon size="32">mdi-twitter</v-icon>
      </v-btn>
    </a>
    <a href="https://github.com/yuki5664" target="_blank">
      <v-btn icon class="mr-2">
        <v-icon size="32" >mdi-github</v-icon>
      </v-btn>
    </a>
  </v-app-bar>
</template>

<script>
  export default {
    data: () => ({
      links: [
        'Blog',
        'Profile',
        'Message',
      ],
    }),
  }
</script>

<style scoped>
  a {
    text-decoration: none;
  }
</style>