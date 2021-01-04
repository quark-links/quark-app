<template>
  <div>
    <v-alert v-if="errorMessage" type="error">
      {{ errorMessage }}
    </v-alert>

    <v-alert v-if="successMessage" type="success">
      {{ successMessage }}
    </v-alert>

    <v-form @submit.prevent="signup">
      <v-text-field v-model="name" outlined label="Display Name" />
      <v-text-field v-model="email" outlined label="Email" required />
      <v-text-field v-model="password" outlined label="Password" type="password" required />
      <v-btn color="primary" type="submit">
        Signup
      </v-btn>
    </v-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data: () => ({
    name: '',
    email: '',
    password: '',
    errorMessage: '',
    successMessage: ''
  }),
  methods: {
    async signup () {
      try {
        // First, create the account
        const createResponse = await this.$axios.$post('/user', {
          name: this.name,
          email: this.email,
          password: this.password
        })
        this.successMessage = 'Your account has been created! You can now login.'
        this.errorMessage = ''
      } catch (err) {
        if (typeof err.response?.data?.detail === 'string') {
          this.errorMessage = err.response.data.detail
        } else {
          this.errorMessage = 'There was a problem signing up!'
        }
      }
    }
  },
  head: {
    title: 'Signup'
  }
})
</script>
