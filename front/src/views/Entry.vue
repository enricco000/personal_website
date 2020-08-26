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
      <markdown-it-vue class="md-body" :content="entry.content" />
    </v-col>

  </v-row>

  </v-container>
</template>

<script>
import EntriesService from '@/services/EntriesService'
import MarkdownItVue from 'markdown-it-vue'
import 'markdown-it-vue/dist/markdown-it-vue.css'

export default {
  components: {
    MarkdownItVue
  },
  data () {
    return {
      error: null,
      entry: {},
      bookmarked: false
    }
  },
  async mounted () {
    const entryId = this.$store.state.route.params.entryId
    this.entry = (await EntriesService.show(entryId)).data
    this.entry.date = this.post.createdAt.substring(0, 19)
    this.bookmarked = this.$store.state.route.params.bookmarked
  },
  computed: {
    mobileNav () {
      return this.$vuetify.breakpoint.smAndDown
    }
  }
}
</script>
