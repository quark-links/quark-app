<template>
  <v-row>
    <v-col class="text-center">
      <img
        src="/v.png"
        alt="Vuetify.js"
        class="mb-5"
      >
      <blockquote class="blockquote">
        The user is <code>{{ JSON.stringify(user) }}</code>
        <v-btn @click="getUser()">
          Get User
        </v-btn>
      </blockquote>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapState(['user'])
  },
  methods: {
    ...mapActions(['getUser'])
  }
})
</script>
