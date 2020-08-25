<template>
  <v-container
  class="fill-height"
  fluid>

    <v-row
    :class="mobileNav ? 'justify-start' : 'justify-center'">

    <v-col
    class="text-left"
    :style="mobileNav ? '' : 'max-width: 720px;'"
    >
      <markdown-it-vue class="md-body" :content="content" />
    </v-col>

  </v-row>

  </v-container>
</template>

<script>
import MarkdownItVue from 'markdown-it-vue'
import 'markdown-it-vue/dist/markdown-it-vue.css'
import Foo from '@/components/Foo.md'

export default {
  components: {
    MarkdownItVue
  },
  data () {
    return {
      content: Foo
    }
  },
  computed: {
    mobileNav () {
      return this.$vuetify.breakpoint.smAndDown
    }
  }
}
</script>
