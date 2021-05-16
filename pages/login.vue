<template>
  <v-container>
    <v-btn color="primary" large block @click="login()">
      Login/Register
    </v-btn>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  methods: {
    login () {
      this.$auth.loginWith('oauth')
    }
  },
  head: {
    title: 'Login'
  }
})
</script>
