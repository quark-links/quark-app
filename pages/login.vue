<template>
  <div>
    <v-alert v-if="errorMessage" type="error">
      {{ errorMessage }}
    </v-alert>

    <v-form @submit.prevent="login">
      <v-text-field v-model="email" outlined label="Email" required />
      <v-text-field v-model="password" outlined label="Password" type="password" required />
      <v-btn color="primary" type="submit">
        Login
      </v-btn>
      <v-btn nuxt to="/signup">
        Signup
      </v-btn>
    </v-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data: () => ({
    email: '',
    password: '',
    errorMessage: ''
  }),
  methods: {
    async login () {
      try {
        const formData = new FormData()
        formData.append('username', this.email)
        formData.append('password', this.password)
        const response = await this.$auth.loginWith('local', { data: formData })
        console.log(response)
      } catch (err) {
        if (typeof err.response?.data?.detail === 'string') {
          this.errorMessage = err.response.data.detail
        } else {
          this.errorMessage = 'There was a problem logging in!'
        }
      }
    }
  },
  head: {
    title: 'Login'
  }
})
</script>
