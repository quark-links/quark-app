<template>
  <div>
    <h1 class="headline">
      Whoops! {{ error.statusCode === 404 ? pageNotFound : otherError }}
    </h1>
    <v-btn class="mt-5" color="primary" nuxt to="/">
      Home page
    </v-btn>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: 'You\'ve hit a dead end',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
