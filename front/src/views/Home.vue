<template>
  <v-container
  fluid
  class="pt-2 pb-0">

    <v-row>
      <v-col
      cols="12">
        <v-card
        color="secondary"
        class="white--text"
        elevation=8
        shaped>
          <v-card-title
          class="text-h3">
            All entries
          </v-card-title>

          <v-alert
        type="error"
        v-if="error"
        elevation=6
        dismissible
        class="text-left"
        >
          {{ error }}
        </v-alert>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
              v-if="$store.state.isUserLoggedin && $store.state.isAdmin"
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
      </v-col>
    </v-row>

    <v-row>
      <v-container
      fluid>
        <v-row
        dense>
          <v-col
          v-for="entry in entries" :key="entry.id"
          :cols="mobileNav ? '12' : '4'">

            <v-card
            link
            shaped>

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
            dense
            no-gutters
            @click="$router.push({ name: 'Entry', params: { entryId: entry.id, bookmarked: entry.bookmarked } })">
              <v-container
              fluid>

                <v-row
                dense
                no-gutters>
                  <v-col
                  cols="12">
                    <div class="text-h5 pl-4 pr-4 pb-1 pt-3 text-left">{{ entry.title }}</div>
                    <div class="text-body-1 text-left pl-4 pr-4 pb-3">{{ entry.subTitle }}</div>
                    <div class="text-subtitle-2 text-left font-italic truncate pl-4 pr-4 pt-1">{{ entry.summary }}</div>
                  </v-col>
                </v-row>

                <v-row
                dense>
                  <v-col>
                    <v-row
                    class="pl-3 pr-3">
                      <div class="text-overline text--secondary text-left pl-4 pr-4 pr-2">{{ entry.topics }}</div>
                    </v-row>
                    <v-row
                    class="pl-3 pr-3">
                      <div class="text-caption text--disabled text-left pl-4 pr-4">By {{ entry.author }}</div>
                    </v-row>
                    <v-row
                    class="pl-3 pr-3">
                      <div class="text-caption text--disabled text-left pl-4 pr-4 pb-0">@ {{ (entry.createdAt).slice(0, 19) }} UTC</div>
                    </v-row>
                  </v-col>
                </v-row>

              </v-container>
            </v-row>

            <v-row
            no-gutters
            dense
            class="pb-0"
            v-if="$store.state.isUserLoggedin && entry.bookmarked">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                  icon
                  color="primary"
                  absolute
                  bottom
                  right
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
            no-gutters
            dense
            class="pb-0"
            v-if="$store.state.isUserLoggedin && !entry.bookmarked">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                icon
                color="primary"
                absolute
                bottom
                right
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

            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-row>

    <v-row>
      <v-container>
        <v-row
        class="justify-center">
          <div class="text-center">
            <v-pagination
            :disabled="numEntries < 6"
            total-visible=6
            color="secondary"
            v-model="page"
            @input="nextPage"
            :length="Math.ceil(numEntries / 6)"
            >
            </v-pagination>
          </div>
        </v-row>
      </v-container>
    </v-row>

  </v-container>
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
        this.error = error
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
