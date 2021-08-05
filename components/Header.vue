<template>
  <v-app-bar
    app
    color="white"
    flat
  >
    <img src="~/assets/title_logo.png" alt="" width="8%" height="140%" class="mt-5">
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
    <v-btn icon class="mr-2">
      <v-icon size="32">mdi-twitter</v-icon>
    </v-btn>
    <v-btn icon class="mr-2">
      <v-icon size="32" >mdi-github</v-icon>
    </v-btn>
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