<template>
  <v-container
  fluid>
    <v-footer
      :padless="true"
      absolute
    >
      <v-card
        flat
        tile
        width="100%"
        color="primary"
        class="text-center"
      >
        <v-card-text>
          <v-btn
            v-for="link in links"
            :key="link.name"
            class="mx-4"
            icon
            :href="link.mailTo ? 'mailto:' + link.url : link.url"
          >
            <v-icon size="24px">{{ link.icon }}</v-icon>
          </v-btn>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          by<br>
          {{ new Date().getFullYear() }} — <strong>
            {{ author }}
          </strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-container>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      links: [
        { name: 'home', icon: 'mdi-pig', mailTo: false, url: null },
        { name: 'mail', icon: 'mdi-email', mailTo: true, url: null },
        { name: 'github', icon: 'mdi-github', mailTo: false, url: null }
      ],
      author: 'Author'
    }
  },
  created () {
    try {
      const config = require('../config/index.js')
      this.links.forEach(link => {
        link.url = config.footerURLs[link.name]
      })
      this.author = config.footerName
    } catch (error) {
      console.log('Please note that you can configure this URL in the config file')
    }
  }
}
</script>

<style scoped>
</style>
