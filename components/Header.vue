<template>
  <header>
    <v-app-bar
    app
    color="white"
    flat
    >
      <!-- モバイル時のみ表示(レスポンシブ -->
      <v-app-bar-nav-icon class="hidden-sm-and-up" @click="drawer = true"></v-app-bar-nav-icon>
      <nuxt-link :to="`/`">
        <img src="images/title_logo_mobile.png" alt="" width="170" height="70" class="mt-6 ml-10 hidden-sm-and-up">
      </nuxt-link>
      <!-- PC時のみ表示(レスポンシブ) -->
      <nuxt-link :to="`/`">
        <img src="images/title_logo.png" alt="" width="100" height="100" class="mt-10 hidden-xs-only">
      </nuxt-link>
      <v-tabs
        centered
        class="ml-n9 hidden-xs-only"
        color="grey darken-1"
      >
        <v-tab
          v-for="link in links"
          :key="link.title"
          :to="`/` + `${link.path}`"
          :nuxt="true">
          {{ link.title }}
        </v-tab>
      </v-tabs>
      <a href="https://twitter.com/tanayu7777" target="_blank">
        <v-btn icon class="mr-2 hidden-xs-only">
          <v-icon size="32">mdi-twitter</v-icon>
        </v-btn>
      </a>
      <a href="https://github.com/yuki5664" target="_blank">
        <v-btn icon class="mr-2 hidden-xs-only">
          <v-icon size="32">mdi-github</v-icon>
        </v-btn>
      </a>
    </v-app-bar>
    <!-- モバイル時のみ表示(レスポンシブ -->
    <v-navigation-drawer
        v-model="drawer"
        fixed
        temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group>
          <v-list-item
            v-for="link in links"
            :key="link.title"
            :to="`/` + `${link.path}`"
            :nuxt="true"
          >
          <v-icon>
            {{ link.icon }}
          </v-icon>
          <v-list-item-content class="ml-3">
            <v-list-item-title>{{ link.title }}</v-list-item-title>
          </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <a href="https://twitter.com/tanayu7777" target="_blank">
        <v-btn icon class="ml-4">
          <v-icon size="32" >mdi-twitter</v-icon>
        </v-btn>
      </a>
      <a href="https://github.com/yuki5664" target="_blank">
        <v-btn icon class="ml-4">
          <v-icon size="32">mdi-github</v-icon>
        </v-btn>
      </a>
    </v-navigation-drawer>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      links: [
        { title: 'Blog', icon: 'mdi-account-edit-outline', path: `` },
        { title: 'Profile', icon: 'mdi-account-circle-outline', path: 'dwos7kgllav' },
        { title: 'Message', icon: 'mdi-forum', path: 'Message' }
      ],
      drawer: false
    }
  }
})
</script>

<style scoped>
  a {
    text-decoration: none;
  }
</style>
