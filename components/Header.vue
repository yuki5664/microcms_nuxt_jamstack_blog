<template>
  <v-app-bar
    app
    color="white"
    flat
  >
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
    <v-icon size="32" class="pr-2">mdi-twitter</v-icon>
    <v-icon size="32" class="pr-2">mdi-github</v-icon>
  </v-app-bar>
</template>

<script>
  export default {
    data: () => ({
      links: [
        'Home',
        'Profile',
        'Message',
      ],
    }),
  }
</script>