export const state = () => ({
  user: {}
})

export const mutations = {
  SET_USER (state: any, user: any) {
    state.user = user
  }
}

export const actions = {
  async getUser (store: any) {
    try {
      const user = await this.$axios.$get('users/me', { progress: false })
      store.commit('SET_USER', user)
    } catch (e) {
      store.commit('SET_USER', {})
    }
  }
}
