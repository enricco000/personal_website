<template>
  <v-container
  class="fill-height pb-10"
  fluid>

    <v-row
    :class="mobileNav ? 'justify-start' : 'justify-center'">

    <v-col
    class="text-left"
    :style="mobileNav ? '' : 'max-width: 1080px;'"
    >
      <markdown-it-vue class="md-body" :content="String(about)" />
    </v-col>

  </v-row>

  </v-container>
</template>

<script>
import About from '@/components/About.md'
import MarkdownItVue from 'markdown-it-vue'
import 'markdown-it-vue/dist/markdown-it-vue.css'

export default {
  components: {
    MarkdownItVue
  },
  data () {
    return {
      about: About
    }
  },
  computed: {
    mobileNav () {
      return this.$vuetify.breakpoint.smAndDown
    }
  }
}
</script>
