<template>
  <v-container
  fluid>

  <v-app-bar
  v-if="!$route.meta.hideNavigation"
  :app=true
  color="primary">

    <v-app-bar-nav-icon
    dark
    @click="drawer = true; loginHide(); loginShow();"
    >
    </v-app-bar-nav-icon>

    <v-toolbar-title>

        <v-tooltip bottom
        v-if="showTopLinks">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
            dark
            icon
            exact
            v-bind="attrs"
            v-on="on"
            to="/"
            >
              <v-icon>mdi-pig-variant</v-icon>
            </v-btn>
          </template>
            <span>Home</span>
        </v-tooltip>

        <v-tooltip bottom
        v-if="showTopLinks">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
            dark
            icon
            exact
            v-bind="attrs"
            v-on="on"
            to="/bio"
            >
              <v-icon>mdi-microscope</v-icon>
            </v-btn>
          </template>
            <span>Biochemistry & Biophysics</span>
        </v-tooltip>

        <v-tooltip bottom
        v-if="showTopLinks">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
            dark
            icon
            exact
            v-bind="attrs"
            v-on="on"
            to="/ds"
            >
              <v-icon>mdi-iframe-variable-outline</v-icon>
            </v-btn>
          </template>
            <span>Data Science</span>
        </v-tooltip>

        <v-tooltip bottom
        v-if="showTopLinks">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
            dark
            icon
            exact
            v-bind="attrs"
            v-on="on"
            to="/dev"
            >
              <v-icon>mdi-code-braces</v-icon>
            </v-btn>
          </template>
            <span>Development</span>
        </v-tooltip>

        <v-tooltip bottom
        v-if="showTopLinks">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
            dark
            icon
            exact
            v-bind="attrs"
            v-on="on"
            to="/math"
            >
              <v-icon>mdi-pi</v-icon>
            </v-btn>
          </template>
            <span>Math</span>
        </v-tooltip>

    </v-toolbar-title>

    <v-spacer></v-spacer>

      <v-row
      justify=end
      class="pr-3">
        <v-text-field
        hide-details
        v-if="$route.name === 'Home' && searchBar"
        v-model="search"
        single-line
        rounded
        clearable
        solo
        :label="mobileNav ? 'Title, content, topics' : 'Search title, author, content or topics'"
        class="shrink pr-1"
        :style="mobileNav ? 'width:250px' : 'width:380px'"
        >
        </v-text-field>
        <v-tooltip bottom
        v-if="$route.name === 'Home'"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
             @click="toggleSearchBar(); showLinks()"
            icon
            dark
            v-bind="attrs"
            v-on="on"
            >
              <v-icon>search</v-icon>
            </v-btn>
          </template>
            <span>Toggle search bar</span>
        </v-tooltip>
      </v-row>

  </v-app-bar>

    <v-navigation-drawer
        v-model="drawer"
        temporary
        dark
        :mini-variant="mobileNav"
        color="tertiary"
        app
    >
      <v-list
        nav
      >
        <v-list-item-group>

          <v-list-item
          v-if="!mobileNav"
          to="about"
          >
            <v-list-item-content>
              <v-list-item-title class="title text-left">
                {{ headerName }}
              </v-list-item-title>
              <v-list-item-subtitle class="text-left">
                {{ headerLastName }}
              </v-list-item-subtitle>
              <v-list-item-subtitle class="text-left">
                (•̀ᴗ•́)و ̑̑
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider
          v-if="!mobileNav">
          </v-divider>

          <v-list-item
          class="text-left"
          v-for="item of activeLinks"
          :key="item.title"
          link
          exact
          :to="item.to">

            <v-list-item-icon
            >
              <v-icon>
                {{ item.icon }}
              </v-icon>
            </v-list-item-icon>

            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>

      <template v-slot:append
      v-if="checkToken">
        <v-container>
          <v-list
        nav
      >
        <v-list-item-group>

          <v-list-item
          class="text-left pr-0 pl-0"
          v-for="item of bottomItems"
          :key="item.title"
          @click="item.action()"
          link>

            <v-list-item-icon
            >
              <v-icon>
                {{ item.icon }}
              </v-icon>
            </v-list-item-icon>

            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
        </v-container>
      </template>

    </v-navigation-drawer>

    <v-snackbar
      v-model="snackbarRules.snackbar"
      :timeout="snackbarRules.timeout"
    >
      {{ snackbarRules.text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackbarRules.snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

  </v-container>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'Header',
  data () {
    return {
      drawer: null,
      headerName: 'Name',
      headerLastName: 'Last Name',
      searchBar: false,
      showTopLinks: true,
      topItems: [
        { title: 'Home', icon: 'mdi-pig-variant', showOnLogin: false, hideOnLogin: false, to: '/', show: true },
        // { title: 'Tienda', icon: 'mdi-storefront', showOnLogin: false, hideOnLogin: false, to: '/shop', show: true },
        { title: 'Sign up', icon: 'mdi-account-plus', showOnLogin: false, hideOnLogin: true, to: '/signup', show: true },
        { title: 'Sign in', icon: 'mdi-login', showOnLogin: false, hideOnLogin: true, to: '/signin', show: true }
      ],
      bottomItems: [
        { title: 'Bookmarks', icon: 'mdi-bookmark-multiple', action: this.navigateToMarkers },
        // { title: 'Ajustes', icon: 'mdi-cog', action: this.navigateToSettings },
        { title: 'Log out', icon: 'mdi-logout', action: this.logout }
      ],
      snackbarRules: {
        snackbar: false,
        text: '¡Adiós!',
        timeout: 2000
      },
      search: null
    }
  },
  methods: {
    navigateTo (name) {
      if (this.$route.name !== name) {
        this.$router.push({ name: name })
      }
    },
    navigateToSettings () {
      this.navigateTo('settings')
    },
    navigateToMarkers () {
      this.navigateTo('bookmarks')
    },
    async logout () {
      try {
        this.drawer = false
        this.$store.dispatch('logout')
        this.snackbarRules.snackbar = true
        setTimeout(() => this.navigateTo('Home'), 200)
        this.topItems
          .filter(u => { return u.hideOnLogin === true })
          .map(u => { u.show = true })
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    loginShow () {
      if (this.checkToken) {
        this.topItems
          .filter(u => { return u.showOnLogin === true })
          .map(u => { u.show = true })
      }
    },
    loginHide () {
      if (this.checkToken) {
        this.topItems
          .filter(u => { return u.hideOnLogin === true })
          .map(function (u) { u.show = false })
      }
    },
    showLinks () {
      this.showTopLinks = !(this.mobileNav && this.searchBar && this.$route.name === 'Home')
    },
    toggleSearchBar () {
      this.searchBar = !this.searchBar
    }
  },
  computed: {
    checkToken: function () {
      return this.$store.state.token != null
    },
    activeLinks: function () {
      return this.topItems
        .filter(u => u.show === true)
    },
    mobileNav () {
      return this.$vuetify.breakpoint.smAndDown
    }
  },
  watch: {
    /* eslint-disable func-call-spacing */
    search: _.debounce (async function (value) {
      const route = {
        name: 'Home'
      }
      if (this.search !== '') {
        route.query = {
          search: this.search
        }
      }
      if (this.$route.query.search !== value) {
        this.$router.push(route)
      }
    }, 200),
    '$route.query.search': {
      immediate: true,
      handler (value) {
        this.search = value
      }
    }
  },
  created () {
    try {
      const config = require('../config/index.js')
      this.headerName = config.headerName
      this.headerLastName = config.headerLastName
    } catch (error) {
      console.log('Please note that you can configure this URL in the config file')
    }
  }
}
</script>

<style scoped>
</style>
