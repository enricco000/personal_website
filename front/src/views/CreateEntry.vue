<template>
    <v-container
    :style="mobileNav ? '' : 'max-width: 1080px;'"
    class="pb-5 pt-6"
    fluid>

    <v-container
    class="pa-0">
      <v-card
      color="secondary"
      class="white--text pa-0"
      elevation=8
      shaped>
        <v-card-title
        class="text-h3">
          New entry
        </v-card-title>
      </v-card>
    </v-container>

       <v-row>
         <v-col>

          <card-slot>

            <div class="text-left" slot="CardText">

              <v-row>
                <v-col>
                  <v-card
                  outlined>
                    <v-container>
                      <v-row>
                        <v-col cols="6">
                          <v-text-field
                            v-model="entry.title"
                            label="Title*"
                            :rules="[value => !!value || 'Required']"
                            :prepend-inner-icon="'mdi-crown'">
                          </v-text-field>
                        </v-col>

                        <v-col cols="6">
                          <v-text-field
                            v-model="entry.author"
                            label="Author*"
                            :rules="[value => !!value || 'Required']"
                            :prepend-inner-icon="'mdi-crown'">
                          </v-text-field>
                        </v-col>
                      </v-row>

                      <v-row>
                        <v-col cols="6">
                          <v-text-field
                            v-model="entry.subTitle"
                            label="Subtitle"
                            :rules="[value => !!value || 'Required']"
                            :prepend-inner-icon="'mdi-crown-outline'">
                          </v-text-field>
                        </v-col>

                        <v-col cols="6">
                          <v-text-field
                            v-model="entry.topics"
                            label="Topics"
                            :prepend-inner-icon="'mdi-chart-bubble'">
                          </v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-card
                  outlined>
                    <v-container>
                      <v-row>
                        <v-col>
                          <v-textarea
                          v-model="entry.summary"
                          label="Summary*"
                          :rules="[value => !!value || 'Required']"
                          rows="2"
                          auto-grow
                          clearable
                          clear-icon="cancel"
                          :prepend-inner-icon="'mdi-form-textarea'">
                          </v-textarea>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-card
                  outlined>
                    <v-container>
                      <v-row>
                        <v-col>
                          <v-textarea
                          v-model="entry.content"
                          label="Content*"
                          :rules="[value => !!value || 'Required']"
                          rows="4"
                          auto-grow
                          clearable
                          clear-icon="cancel"
                          :prepend-inner-icon="'mdi-form-textarea'">
                          </v-textarea>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card>
                </v-col>
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

              <v-snackbar
              v-model="snackbarRules.snackbar"
              :timeout="snackbarRules.timeout"
              >
                {{ snackbarRules.text }}

                <template v-slot:action="{ attrs }">
                  <v-btn
                    color="green"
                    text
                    v-bind="attrs"
                    @click="snackbarRules.snackbar = false"
                  >
                    OK
                  </v-btn>
                </template>
              </v-snackbar>

            </div>

            <v-card-actions
            slot="BottomCard">
              <v-row
              :justify="'end'"
              class="mr-2 pb-2">
                  <v-btn
                  :disabled="!entry.title || !entry.content"
                  color="secondary"
                  class="white--text"
                  @click="create()">
                    Create
                  </v-btn>
              </v-row>
            </v-card-actions>

          </card-slot>

         </v-col>
       </v-row>
    </v-container>
</template>

<script>
import CardSlot from '@/components/CardSlot'
import EntriesService from '@/services/EntriesService'

export default {
  name: 'CreateContent',
  data () {
    return {
      error: null,
      entry: {
        title: null,
        subTitle: null,
        summary: null,
        author: undefined,
        content: null,
        topics: null
      },
      snackbarRules: {
        snackbar: false,
        text: 'Post successful!',
        timeout: 2000
      }
    }
  },
  components: {
    CardSlot
  },
  methods: {
    async create () {
      try {
        await EntriesService.post(this.entry)
        this.snackbarRules.snackbar = true
        this.error = null
        setTimeout(() => this.$router.push({ name: 'Home' }), 1250)
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  },
  created () {
    this.entry.author = this.$store.state.user.username
    this.entry.topics = this.$store.state.route.params.topics
  },
  computed: {
    mobileNav () {
      return this.$vuetify.breakpoint.smAndDown
    }
  }
}
</script>

<style scoped>
</style>
