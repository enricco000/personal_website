<template>
    <v-container
    fluid>

      <v-card
      hover
      extended>

          <v-toolbar
          color="secondary"
          class="white--text mb-4">
            <v-toolbar-title>
                <h2
                class="ml-2 mt-2">
                  Entradas
                </h2>
            </v-toolbar-title>
            <template v-slot:extension
            v-if="this.$store.state.token != null">
              <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    fab
                    color="quaternary"
                    bottom
                    dark
                    right
                    absolute
                    v-bind="attrs"
                    v-on="on"
                    to="/content/create"
                  >
                    <v-icon>mdi-pen-plus</v-icon>
                  </v-btn>
                  </template>
                  <span>Crear nueva entrada</span>
                </v-tooltip>
            </template>
          </v-toolbar>

        <v-card-text
        v-for="entry in entries" :key="entry.id">

              <v-card
              outlined>

              <v-row
               class="ml-2 mt-2"
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
                  <span>Eliminar marcador</span>
                </v-tooltip>
              </v-row>

              <v-row
               class="ml-2 mt-2"
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
                  <span>Marcar esta entrada</span>
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
                  cols="8">
                    <v-list-item>
                      <v-list-item-content>
                        <div class="overline text-left mb-1">
                          {{ entry.author }} - {{ (entry.createdAt).slice(0, 19) }} UTC
                        </div>
                        <v-list-item-title class="headline mb-1 text-left">{{ entry.title }}</v-list-item-title>
                        <v-list-item-subtitle class="text-left mb-2">{{ entry.subTitle }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>

                  <v-col
                  cols="4"
                  v-if="entry.image">
                    <v-fade-transition mode="out-in">
                      <v-card
                      hover>
                        <v-img
                          height=125
                          width=400
                          :src="entry.image"
                          class="secondary"
                        ></v-img>
                      </v-card>
                    </v-fade-transition>
                  </v-col>

                </v-row>

                <v-row
                no-gutters
                class="mb-2">
                  <v-col
                  sm="10">
                    <v-row
                    no-gutters>
                      <div
                      class="text-left ml-4 ma-2 truncate">
                        {{ entry.content }}
                      </div>
                    </v-row>
                  </v-col>

                  <v-col
                  cols="auto"
                  class="ml-auto">
                    <v-row
                    no-gutters
                    :justify="'end'"
                    :align="'end'"
                    class="mr-1 ma-1">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                              fab
                              small
                              dark
                              v-bind="attrs"
                              v-on="on"
                              color="tertiary"
                              :to="{name: 'post', params: {postId: entry.id, bookmarked: entry.bookmarked}}">
                                <v-icon>
                                  mdi-text-subject
                                </v-icon>
                              </v-btn>
                        </template>
                        <span>Ir a la entrada</span>
                      </v-tooltip>
                    </v-row>
                  </v-col>
                </v-row>

                <v-row
                v-if="entry.youtubeId"
                no-gutters>
                  <v-expansion-panels>
                    <v-expansion-panel>
                      <v-expansion-panel-header>Video</v-expansion-panel-header>
                      <v-expansion-panel-content>

                          <youtube
                          v-if="!mobileNav"
                          :video-id="entry.youtubeId"
                          :player-width="400"
                          :player-height="250">
                          </youtube>

                          <youtube
                          v-if="mobileNav"
                          :video-id="entry.youtubeId"
                          :player-width="200"
                          :player-height="100">
                          </youtube>

                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-row>

              </v-card>

        </v-card-text>

      </v-card>
    </v-container>
</template>

<script>
import BookmarksService from '@/services/BookmarksService'
import EntriesService from '@/services/EntriesService'
export default {
  name: 'Content',
  data () {
    return {
      error: null,
      entries: null,
      starredEntries: null
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
        this.entries = (await EntriesService.index(value)).data
        if (this.$store.state.isUserLoggedin) {
          this.entries.forEach(async entry => {
          // this.$set is the only way to add a new reactive property
            this.$set(entry, 'bookmarked', (await BookmarksService.index({
              entryId: entry.id
            })).data)
          })
        }
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
        this.error = error.response.error
      }
    },
    async removeBookmark (entryId) {
      try {
        await BookmarksService.delete({
          EntryId: entryId
        })
      } catch (error) {
        this.error = error.response.error
      }
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
