<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" fixed app>
      <template v-slot:prepend>
        <client-only>
          <v-list-item v-if="$auth.loggedIn" two-line>
            <v-list-item-avatar>
              <v-avatar color="primary" size="256">
                {{ avatarInitials }}
              </v-avatar>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Logged In</v-list-item-title>
              <v-list-item-subtitle class="text-capitalize">
                {{ $auth.user.name || $auth.user.email.split("@")[0] }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </client-only>
      </template>

      <v-divider />

      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-account-circle',
          title: 'Account',
          to: '/account'
        },
        {
          icon: 'mdi-information',
          title: 'About',
          to: '/about'
        }
      ],
      title: 'VH7'
    }
  },
  computed: {
    avatarInitials () {
      if (this.$auth.user.name) {
        return this.$auth.user.name.split(' ').map(x => x[0].toUpperCase()).join('')
      } else {
        return this.$auth.user.email[0].toUpperCase()
      }
    }
  }
}
</script>
