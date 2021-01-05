<template>
  <div>
    <client-only>
      <v-alert v-if="!$auth.loggedIn" type="info">
        Login to save your short links!
      </v-alert>
      <v-card v-else outlined class="mb-5">
        <v-card-title>
          Welcome back, {{ $auth.user.name || $auth.user.email.split("@")[0] }}!
        </v-card-title>
      </v-card>
    </client-only>

    <v-card :loading="loading" outlined>
      <template slot="progress">
        <v-progress-linear :indeterminate="loadingProgress <= 0" :value="loadingProgress" />
      </template>
      <v-tabs v-model="tab" fixed-tabs>
        <v-tab v-for="t in tabs" :key="t" :disabled="loading">
          {{ t }}
        </v-tab>
      </v-tabs>
      <v-card-text v-if="loading && loadingText" class="text-center body-1" v-text="loadingText" />
      <v-card-text v-if="result">
        <v-alert v-model="showResult" :type="result.success ? 'success' : 'error'" dismissible>
          <div v-if="result.success">
            Shortened to <b v-text="result.data.link" />!
          </div>
          <div v-else>
            Whoops! There was a problem while processing your request:<br><i v-text="result.data" />
          </div>
        </v-alert>
      </v-card-text>
      <v-tabs-items v-if="!loading" v-model="tab">
        <v-tab-item>
          <v-card-text>
            <v-text-field v-model="url" outlined label="URL" prepend-icon="mdi-link" required />
          </v-card-text>
        </v-tab-item>

        <v-tab-item>
          <v-card-text>
            <v-alert type="info">
              Uploaded files will last between 30 and 90 days depending on their size. You can upload a maximum of 256 Mb at a time.
            </v-alert>
            <v-file-input v-model="file" outlined prepend-icon="mdi-file" required />
          </v-card-text>
        </v-tab-item>

        <v-tab-item>
          <v-card-text>
            <v-textarea
              v-model="code"
              outlined
              auto-grow
              label="Code"
              prepend-icon="mdi-code-tags"
              required
            />
            <v-select
              v-model="language"
              outlined
              label="Language"
              prepend-icon="mdi-format-color-highlight"
              :items="languages"
              item-text="name"
              item-value="id"
              required
            />
          </v-card-text>
        </v-tab-item>
      </v-tabs-items>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" :disabled="loading" @click="submit()">
          Create
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data: () => ({
    loading: false,
    loadingProgress: -1,
    loadingText: 'Please wait...',
    tab: 0,
    tabs: ['Shorten', 'Upload', 'Paste'],
    url: '',
    file: null as unknown as File,
    code: '',
    language: 'plaintext',
    languages: [
      {
        id: 'plaintext',
        name: 'Plain Text',
        filetype: '.txt'
      }
    ],
    showResult: false,
    result: null as { data: any, success: boolean } | null
  }),
  methods: {
    copyToClipboard (text: string) {
      const permissionName = 'clipboard-write' as PermissionName
      navigator.permissions.query({ name: permissionName }).then((result) => {
        if (result.state === 'granted' || result.state === 'prompt') {
          navigator.clipboard.writeText(text)
        }
      })
    },
    handleProgress (status: string, progress = -1) {
      let message = status
      if (progress >= 0) {
        message += ` (${progress.toFixed(1)}%)`
      }
      message += '...'

      this.loadingText = message
      this.loadingProgress = progress
      this.loading = true
    },
    handleDone (data: any) {
      this.clear()
      this.loading = false
      this.result = {
        data,
        success: true
      }
      this.showResult = true
      this.copyToClipboard(data.link)
    },
    handleError (error: any) {
      this.loading = false
      this.result = {
        data: error,
        success: false
      }
      this.showResult = true
    },
    submit () {
      (async () => {
        if (this.tab === 0) {
          return await this.$axios.$post('/shorten', {
            url: this.url
          })
        } else if (this.tab === 1) {
          const formData = new FormData()
          formData.append('file', this.file)
          const progressFunction = this.handleProgress

          return await this.$axios.$post('/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            onUploadProgress (e: any) {
              const progress = (e.loaded / e.total) * 100
              progressFunction('Uploading', progress)
            }
          })
        } else if (this.tab === 2) {
          return await this.$axios.$post('/paste', {
            language: this.language,
            code: this.code
          })
        }
      })().then(this.handleDone).catch(this.handleError)
    },
    clear () {
      this.url = ''
      this.file = null as unknown as File
      this.code = ''
      this.language = ''
    }
  },
  head: {
    title: 'Home'
  }
})
</script>
