<template>
  <div id="app">
    <v-app>

      <v-container
      class="pb-5">
        <page-header />
      </v-container>

      <v-container
      class="mt-5 mb-5 pl-2 pr-2 scroll-y"
      :style="mobileNav ? '' : 'max-width: 1080px;'">
        <router-view />
      </v-container>

      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-fab-transition>
            <v-btn
              style="transform-origin: center center 0px;"
              v-scroll="onScroll"
              v-show="showScroll"
              fab
              bottom
              right
              dark
              fixed
              color="tertiary"
              v-bind="attrs"
              v-on="on"
              @click="toTop"
            >
              <v-icon>mdi-chevron-up</v-icon>
            </v-btn>
          </v-fab-transition>
        </template>
          <span>Scroll to top</span>
      </v-tooltip>

      <v-container
      class="pt-12">
        <page-footer />
      </v-container>

    </v-app>
  </div>
</template>

<script>
import PageHeader from '@/components/Header.vue'
import PageFooter from '@/components/Footer.vue'

export default {
  name: 'App',
  components: {
    PageHeader,
    PageFooter
  },
  data () {
    return {
      showScroll: false
    }
  },
  created () {
    try {
      const config = require('./config/index.js')
      document.title = config.title
    } catch (error) {
      document.title = 'front'
    }
  },
  computed: {
    mobileNav () {
      return this.$vuetify.breakpoint.smAndDown
    }
  },
  methods: {
    onScroll (object) {
      if (typeof window === 'undefined') return
      const top = window.pageYOffset || object.target.scrollTop || 0
      this.showScroll = top > 20
    },
    toTop () {
      this.$vuetify.goTo(0)
    }
  }
}
</script>

<style lang="scss">
  #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.katex { font-size: 1em; }
</style>
