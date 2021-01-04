<template>
  <div>
    <v-card outlined>
      <v-card-title>
        VH7
      </v-card-title>
      <v-card-subtitle>
        A free and open source URL shortening, file sharing and pastebin service.
      </v-card-subtitle>
      <v-card-text>
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
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" href="https://github.com/jake-walker/vh7" target="_blank">
          VH7 Server Github
        </v-btn>
        <v-btn color="primary" href="https://github.com/jake-walker/vh7-app" target="_blank">
          VH7 App Github
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-card class="mt-5" outlined>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            Instance URL
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ info.url }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            Instance Admin
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ info.admin }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            Instance Version
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ info.version }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            Instance Statistics
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ info.stats.shortened_links }} shortened links,
            {{ info.stats.uploaded_files }} uploaded files,
            {{ info.stats.pasted_code }} pasted code,
            {{ info.stats.total }} total
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  middleware: 'auth',
  async asyncData ({ $axios }) {
    const info = await $axios.$get('/info')
    return { info }
  },
  data: () => ({
    info: []
  }),
  head: {
    title: 'About'
  }
})
</script>
