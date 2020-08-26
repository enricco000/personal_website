<template>
  <v-row
  no-gutters>
  <v-col>

    <v-container
    class="pb-4 pt-4"
    flex>

    <v-row>
      <v-container>
        <v-card
          color="secondary"
          class="white--text pa-0"
          elevation=8
          shaped>
            <v-card-title
            class="text-h3">
              Entries
            </v-card-title>

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                fab
                color="tertiary"
                bottom
                dark
                right
                absolute
                v-bind="attrs"
                v-on="on"
                to="/entry/create"
                >
                  <v-icon>mdi-pen-plus</v-icon>
                </v-btn>
              </template>
              <span>Write new entry</span>
              </v-tooltip>

          </v-card>
      </v-container>
    </v-row>

    <v-row>
      <v-container
      v-for="entry in entries" :key="entry.id"
      class="pa-2">
        <v-card
        shaped
        :to="{ name: 'Entry', params: { entryId: entry.id, bookmarked: entry.bookmarked } }">

        <v-row
        class="pl-5 pt-2"
          v-if="$store.state.isUserLoggedin && entry.bookmarked">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
              fab
              small
              v-bind="attrs"
              v-on="on"
              @click="removeBookmark(entry.id); entry.bookmarked=false">
            <v-icon>
              mdi-star
            </v-icon>
          </v-btn>
            </template>
            <span>Remove bookmark</span>
          </v-tooltip>
        </v-row>

        <v-row
          class="pl-5 pt-2"
          v-if="$store.state.isUserLoggedin && !entry.bookmarked">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
              fab
              small
              v-bind="attrs"
              v-on="on"
              @click="createBookmark(entry.id); entry.bookmarked=true">
            <v-icon>
              mdi-star-outline
            </v-icon>
          </v-btn>
            </template>
            <span>Bookmark this entry</span>
          </v-tooltip>
        </v-row>

        <v-alert
        type="error"
        v-if="error"
        elevation=6
        dismissible
        class="text-left"
        >
          {{ error }}
        </v-alert>
            <v-row
            no-gutters>
              <v-col
              cols="12">
                <div class="text-h4 pl-4 pb-1 pt-3 text-left">{{ entry.title }}</div>
                <div class="text-subtitle-1 text-left pl-4 pb-1">{{ entry.subTitle }}</div>
                <div class="text-body-1 text-left font-italic truncate pl-4 pr-2">{{ entry.summary }}</div>
              </v-col>
            </v-row>

          <v-row>
            <v-col>
              <v-row
              class="pl-3">
                <div class="text-caption text--disabled text-left pl-4">By {{ entry.author }}</div>
              </v-row>
              <v-row
              class="pl-3">
                <div class="text-caption text--disabled text-left pl-4 pb-0">@ {{ (entry.createdAt).slice(0, 19) }} UTC</div>
              </v-row>
            </v-col>

            <v-col
            cols="4">
              <v-row
              justify="end"
              align="end"
              class="pr-5">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        fab
                        small
                        dark
                        v-bind="attrs"
                        v-on="on"
                        color="tertiary"
                        :to="{name: 'Article', params: {articleId: entry.id, bookmarked: entry.bookmarked}}">
                          <v-icon>
                            mdi-text-subject
                          </v-icon>
                        </v-btn>
                  </template>
                  <span>Read entry</span>
                </v-tooltip>
              </v-row>
            </v-col>
          </v-row>

        </v-card>
      </v-container>

      <v-row
      class="justify-center">
        <div class="text-center pt-3 pb-3">
          <v-pagination
          v-if="numEntries > 10"
          color="secondary"
           v-model="page"
           @input="nextPage"
          :length="Math.ceil(numEntries / 10)"
          >
          </v-pagination>
        </div>
      </v-row>

    </v-row>

    </v-container>

  </v-col>
  </v-row>
</template>

<script>
import BookmarksService from '@/services/BookmarksService'
import EntriesService from '@/services/EntriesService'

export default {
  name: 'Home',
  data () {
    return {
      error: null,
      entries: null,
      search: null,
      numEntries: null,
      page: 1
    }
  },
  computed: {
    mobileNav () {
      return this.$vuetify.breakpoint.smAndDown
    }
  },
  watch: {
    '$route.query.search': {
      immediate: true,
      async handler (value) {
        // we store the value so we can use it with the pagination
        this.search = value
        this.countEntries(value)
        this.fetchEntries(value, 1)
      }
    }
  },
  methods: {
    async createBookmark (entryId) {
      try {
        await BookmarksService.post({
          EntryId: entryId
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    async removeBookmark (entryId) {
      try {
        await BookmarksService.delete({
          EntryId: entryId
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    async fetchEntries (search, page) {
      try {
        const response = await EntriesService.index(search, page)
        this.entries = response.data
        if (this.$store.state.isUserLoggedin) {
          this.entries.forEach(async entry => {
            // this.$set is the only way to add a new reactive property
            this.$set(entry, 'bookmarked', (await BookmarksService.index({
              entryId: entry.id
            })).data)
          })
        }
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    async countEntries (search) {
      try {
        const response = await EntriesService.count(search)
        this.numEntries = response.data.numEntries
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    async nextPage (page) {
      // we store the value so we can use it with the search watcher
      this.page = page
      this.countEntries(this.search)
      this.fetchEntries(this.search, page)
    }
  }
}
</script>

<style scoped>
.truncate {
      height: 1.5rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
</style>
