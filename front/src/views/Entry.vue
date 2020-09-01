<template>
  <v-container
  class="fill-height pb-1 pt-2">

    <v-row
    dense
    class="pb-4">
      <v-col
      cols="12">
        <v-card
        shaped
        color="secondary">
          <v-container
          fluid
          class="pa-0">
            <v-row
            dense>

            <v-col
            v-if="!mobileNav">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    dark
                    icon
                    exact
                    v-bind="attrs"
                    v-on="on"
                    :to="{name: 'Home'}"
                    >
                      <v-icon>mdi-home</v-icon>
                    </v-btn>
                  </template>
                    <span>Home</span>
                </v-tooltip>
              </v-col>

              <v-col
              v-if="$store.state.isUserLoggedin && $store.state.isAdmin">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    dark
                    icon
                    exact
                    v-bind="attrs"
                    v-on="on"
                    :to="{name: 'EditEntry'}"
                    >
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </template>
                    <span>Edit entry</span>
                </v-tooltip>
              </v-col>

              <v-col
              v-if="$store.state.isUserLoggedin && $store.state.isAdmin">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    icon
                    dark
                    exact
                    v-bind="attrs"
                    v-on="on"
                    @click="deleteEntry(entry.id)"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </template>
                    <span>Delete entry</span>
                </v-tooltip>
              </v-col>

               <v-col
                v-if="$store.state.isUserLoggedin && bookmarked==true">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    dark
                    icon
                    exact
                    v-bind="attrs"
                    v-on="on"
                    @click="removeBookmark(entry.id); bookmarked=false"
                    >
                      <v-icon>mdi-star</v-icon>
                    </v-btn>
                  </template>
                    <span>Remove bookmark</span>
                </v-tooltip>
              </v-col>

               <v-col
               v-if="$store.state.isUserLoggedin && !bookmarked">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    dark
                    icon
                    exact
                    v-bind="attrs"
                    v-on="on"
                    @click="createBookmark(entry.id); bookmarked=true"
                    >
                      <v-icon>mdi-star-outline</v-icon>
                    </v-btn>
                  </template>
                    <span>Bookmark this entry</span>
                </v-tooltip>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>

    <v-row
    :class="mobileNav ? 'justify-start' : 'justify-center'">

    <v-col
    class="text-left">
      <markdown-it-vue
      class="md-body"
      :content="String(entry.content)" />
    </v-col>

  </v-row>

  <v-snackbar
  v-model="snackbarRules.snackbar"
  :timeout="snackbarRules.timeout"
  >
    {{ snackbarRules.text }}

    <template v-slot:action="{ attrs }">
      <v-btn
        color="orange"
        text
        v-bind="attrs"
        @click="snackbarRules.snackbar = false"
      >
        OK
      </v-btn>
    </template>
  </v-snackbar>

  </v-container>
</template>

<script>
import EntriesService from '@/services/EntriesService'
import BookmarksService from '@/services/BookmarksService'
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
      bookmarked: null,
      snackbarRules: {
        snackbar: false,
        text: 'Entry deleted',
        timeout: 1000
      }
    }
  },
  methods: {
    async createBookmark (entryId) {
      try {
        await BookmarksService.post({
          entryId: entryId
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    async removeBookmark (entryId) {
      try {
        await BookmarksService.delete({
          entryId: entryId
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    async deleteEntry (entryId) {
      try {
        await EntriesService.delete({
          entryId: entryId
        })
        this.snackbarRules.snackbar = true
        setTimeout(() => this.$router.push({ name: 'Home' }), 1250)
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  },
  async mounted () {
    const entryId = this.$store.state.route.params.entryId
    this.entry = (await EntriesService.show(entryId)).data
    this.bookmarked = this.$store.state.route.params.bookmarked
  },
  computed: {
    mobileNav () {
      return this.$vuetify.breakpoint.smAndDown
    }
  }
}
</script>
