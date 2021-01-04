<template>
  <div>
    <v-card outlined>
      <v-card-title class="text-capitalize headline">
        {{ $auth.user.name || $auth.user.email.split("@")[0] }}
      </v-card-title>
      <v-card-text>
        <v-text-field v-model="name" outlined label="Name" />
        <v-text-field v-model="email" outlined label="Email" />
      </v-card-text>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Created</v-list-item-title>
          <v-list-item-subtitle>{{ $auth.user.created | humanDate }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Updated</v-list-item-title>
          <v-list-item-subtitle>{{ $auth.user.updated | humanDate }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Confirmed</v-list-item-title>
          <v-list-item-subtitle>
            <span v-if="$auth.user.confirmed">
              Your account was confimed on {{ $auth.user.confirmed_on | humanDate }}
            </span>
            <span v-else>
              Your account is not confirmed
            </span>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-card-actions>
        <v-spacer />
        <v-btn color="error" @click="$auth.logout()">
          Logout
        </v-btn>
        <v-btn color="primary" @click="save()">
          Save
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  middleware: 'auth',
  async asyncData ({ $axios }) {
    const links = await $axios.$get('/users/me/links')
    return { links }
  },
  data () {
    return {
      links: [],
      name: this.$auth.user?.name,
      email: this.$auth.user?.email
    }
  },
  methods: {
    viewUrl (link: any) {
      const id = link.link.split('/').slice(-1)[0]
      return `/link/${id}`
    },
    async save () {
      let response
      try {
        response = await this.$axios.$patch('/users/me', {
          name: this.name,
          email: this.email
        })
      } catch (err) {
        alert(`There was a problem whilst saving your profile! ${err}`)
        return
      }

      this.$auth.setUser(response)
    }
  },
  head: {
    title: 'Account'
  }
})
</script>
