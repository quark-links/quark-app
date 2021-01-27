<template>
  <div>
    <div id="header" class="grey darken-4">
      <v-img src="/img/vh7.png" height="150" contain />
    </div>

    <v-container>
      <h1>VH7</h1>
      <p>
        A free and open source URL shortening, file sharing and pastebin service.
      </p>
      <p>
        <ul>
          <li>
            <b>Free.</b> VH7 is not only free to use on the official instance but is also free to download and run for yourself.
          </li>
          <li>
            <b>Open Source.</b> All of VH7's source code is available here for the community to take a look under the hood. We also accept community contributions, just open a pull request!
          </li>
          <li>
            <b>Multi-purpose.</b> Unlike other mainstream URL shorteners, VH7 also provides file sharing and a pastebin also with short links.
          </li>
        </ul>
      </p>
      <v-btn color="accent" href="https://github.com/jake-walker/vh7" target="_blank">
        VH7 Server Github
      </v-btn>
      <v-btn color="accent" href="https://github.com/jake-walker/vh7-app" target="_blank">
        VH7 App Github
      </v-btn>
    </v-container>

    <v-container>
      <v-card outlined>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              App Version
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ version }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              Server URL
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ info.url }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              Server Admin
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ info.admin }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              Server Version
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ info.version }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              Server Statistics
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ info.stats.shortened_links }} shortened links<br>
              {{ info.stats.uploaded_files }} uploaded files<br>
              {{ info.stats.pasted_code }} pasted code<br>
              {{ info.stats.total }} total
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData ({ $axios }) {
    const info = await $axios.$get('/info')
    return { info }
  },
  data: () => ({
    info: [],
    version: '1.0.0'
  }),
  head: {
    title: 'About'
  }
})
</script>

<style scoped>
  #header {
    padding-top: 40px;
    padding-bottom: 40px;
  }
</style>
