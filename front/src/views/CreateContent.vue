<template>
  <v-container>
  <v-row
  class="justify-center">
    <v-col
    class="text-left"
    cols="12"
    style="max-width: 720px;"
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
  }
}
</script>
