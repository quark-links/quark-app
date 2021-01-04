<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" md="8">
        <v-card v-if="data">
          <v-card-title class="headline">
            {{ title }}
          </v-card-title>

          <v-card-text v-if="warningText && !expired">
            <v-alert type="warning" class="mb-0">
              {{ warningText }}
            </v-alert>
          </v-card-text>

          <v-card-text v-if="expired">
            <v-alert type="info" class="mb-0">
              This download has expired and no longer exists so you will not be
              able to download it.
            </v-alert>
          </v-card-text>

          <v-card-text v-if="data.url" class="body-1">
            Redirects to <b>{{ data.url.url }}</b>.
          </v-card-text>

          <v-card-text v-if="data.paste" class="body-1">
            <!-- TODO: Highlight code -->
            <pre><code>{{ data.paste.code }}</code></pre>
          </v-card-text>

          <v-card-text v-if="data.upload" class="body-1">
            <ul>
              <li><b>Type</b>: {{ data.upload.mimetype }}</li>
              <li><b>Filename</b>: {{ data.upload.original_filename }}</li>
              <li><b>Hash</b>: <code>{{ data.upload.hash }}</code></li>
              <li><b>Expires</b>: {{ data.upload.expires | humanDate(true) }}</li>
            </ul>
          </v-card-text>

          <v-divider />

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Created</v-list-item-title>
              <v-list-item-subtitle>{{ data.created | humanDate }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Updated</v-list-item-title>
              <v-list-item-subtitle>{{ data.updated | humanDate }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Link</v-list-item-title>
              <v-list-item-subtitle>{{ data.link }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-card-actions>
            <v-spacer />

            <v-btn v-if="canDownload" color="primary" :disabled="expired" @click="download()">
              <v-icon left dark>
                mdi-download
              </v-icon>
              Download
            </v-btn>

            <v-btn v-if="canCopy" color="primary" @click="copy()">
              <v-icon left dark>
                mdi-content-copy
              </v-icon>
              Copy
            </v-btn>

            <v-btn v-if="canOpen" color="primary" @click="open()">
              <v-icon left dark>
                mdi-arrow-right-circle
              </v-icon>
              Open
            </v-btn>
          </v-card-actions>
        </v-card>

        <v-alert v-else type="warning">
          The short link <code>{{ $route.params.id }}</code> does not exist.
        </v-alert>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { saveAs } from 'file-saver'
import { DateTime } from 'luxon'

export default Vue.extend({
  async asyncData ({ $axios, route }) {
    const id = route.params.id
    try {
      const data = await $axios.$get(`/info/${id}`)
      return { data }
    } catch (e) {
      return { data: null }
    }
  },
  data: () => ({
    data: null as any
  }),
  computed: {
    title () {
      if (this.data?.url) {
        return 'Shortened URL'
      } else if (this.data?.paste) {
        const language = this.data.paste.language.charAt(0).toUpperCase() + this.data.paste.language.slice(1)
        return `${language} Code`
      } else if (this.data?.upload) {
        return this.data.upload.original_filename
      } else {
        return 'Short Link Not Found'
      }
    },
    description () {
      if (this.data?.url) {
        return `A shortened URL to '${this.data.url.url}'`
      } else if (this.data?.paste) {
        const language = this.data.paste.language.charAt(0).toUpperCase() + this.data.paste.language.slice(1)
        const length = this.data.paste.code.split(/\r\n|\r|\n/).length
        return `A snippet of ${length} lines of ${language} code`
      } else if (this.data?.upload) {
        const date = DateTime.fromISO(this.data.upload.expires).toLocaleString()
        return `An uploaded file '${this.data.upload.original_filename}' which expires ${date}`
      } else {
        return 'Short Link Not Found'
      }
    },
    canDownload () {
      return (this.data?.upload || this.data?.paste)
    },
    canCopy () {
      return this.data?.paste
    },
    canOpen () {
      return this.data?.url
    },
    expired () {
      if (!this.data?.upload) { return false }
      const expiry = DateTime.fromISO(this.data.upload.expires)
      const now = DateTime.utc()
      return (now >= expiry)
    },
    warningText () {
      if (this.data?.upload) {
        return 'Files uploaded to VH7 are not checked for viruses, spyware or other potentially unwanted programs. Please be cautious when downloading files from people that you don\'t know!'
      } else {
        return false
      }
    }
  },
  methods: {
    download () {
      const name = this.data.link.split('/').slice(-1)[0]
      if (this.data?.paste) {
        const blob = new Blob([this.data.paste.code], { type: 'text/plain;charset=utf-8' })
        // TODO: save with correct extension
        saveAs(blob, `vh7-paste-${name}.txt`)
      } else if (this.data?.upload) {
        const url = new URL(`download/${name}`, process.env.API_URL).href
        window.open(url, '_blank')
      }
    },
    copy () {
      const permissionName = 'clipboard-write' as PermissionName
      const text = this.data.paste.code
      navigator.permissions.query({ name: permissionName }).then((result) => {
        if (result.state === 'granted' || result.state === 'prompt') {
          navigator.clipboard.writeText(text)
        }
      })
    },
    open () {
      const url = this.data.url.url
      window.location.href = url
    }
  },
  head () {
    return {
      title: (this as any).title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: (this as any).description
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: (this as any).description
        }
      ]
    }
  }
})
</script>
