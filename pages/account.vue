<template>
  <v-container>
    <v-card outlined>
      <v-card-title class="text-capitalize headline">
        {{ $auth.user.given_name || $auth.user.email.split("@")[0] }}
      </v-card-title>

      <v-card-text>
        Account editing is coming soon. Please contact the instance admin (on the about page) to update your details.
      </v-card-text>

      <v-list-item v-for="(value, key) in $auth.user" :key="'user-' + key">
        <v-list-item-content>
          <v-list-item-title>{{ key }}</v-list-item-title>
          <v-list-item-subtitle>{{ value }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-card-actions>
        <v-spacer />
        <v-btn color="error" @click="$auth.logout()">
          Logout
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-card outlined class="mt-5">
      <v-card-title>
        Your Short Links
      </v-card-title>
      <v-list-item v-for="link in links" :key="link.link" nuxt :to="viewUrl(link)">
        <v-list-item-content>
          <v-list-item-title v-if="link.url">
            <v-chip small color="blue">
              Shorten
            </v-chip>
            {{ link.url.url }}
          </v-list-item-title>
          <v-list-item-title v-if="link.upload">
            <v-chip small color="green">
              Upload
            </v-chip>
            {{ link.upload.original_filename }}
          </v-list-item-title>
          <v-list-item-title v-if="link.paste" class="text-capitalize">
            <v-chip small color="red">
              Paste
            </v-chip>
            {{ link.paste.language }} Code
          </v-list-item-title>
          <v-list-item-subtitle>
            Created {{ link.created | humanDate }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  middleware: 'auth',
  async asyncData ({ $axios }) {
    const links = await $axios.$get('/users/me/links')
    return { links }
  },
  methods: {
    viewUrl (link: any) {
      const id = link.link.split('/').slice(-1)[0]
      return `/link/${id}`
    }
  },
  head: {
    title: 'Account'
  }
})
</script>
