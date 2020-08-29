<template>

  <v-container
  fluid
  class="pb-10">

    <card-slot
    v-if="$store.state.isUserLoggedin">

      <div slot="CardText"
      class="pb-2">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Title</th>
                <th class="text-left">Topics</th>
                <th class="text-left">Summary</th>
                <th class="text-left">Author</th>
                <th class="text-left">Fecha</th>
              </tr>
            </thead>
            <tbody>
              <tr
              v-for="entry in starredEntries" :key="entry.id"
              link
              @click="navigateTo({name: 'Entry', params: {entryId: entry.id, bookmarked: true}})">
                <td class="text-left">{{ entry.Entry.title }}</td>
                <td class="text-left">{{ entry.Entry.topics }}</td>
                <td class="text-left">{{ entry.Entry.summary }}</td>
                <td class="text-left">{{ entry.Entry.author }}</td>
                <td class="text-left">{{ entry.Entry.createdAt.substring(0, 10) }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-alert
        type="error"
        v-if="error"
        elevation=6
        dismissible
        class="text-left"
        >
          {{ error }}
        </v-alert>
      </div>

    </card-slot>
  </v-container>

</template>

<script>
import CardSlot from '@/components/CardSlot'
import BookmarksService from '@/services/BookmarksService'

export default {
  name: 'BookmarkedEntries',
  data () {
    return {
      starredEntries: [],
      error: null
    }
  },
  components: {
    CardSlot
  },
  methods: {
    navigateTo ({ name, params }) {
      if (this.$route.name !== name) {
        this.$router.push({ name: name, params: params })
      }
    }
  },
  async mounted () {
    try {
      const { getters } = this.$store
      if (getters.isUserLoggedin === true) {
        this.starredEntries = (await BookmarksService.indexer({
        })).data
      }
    } catch (err) {
      this.error = err.response.data.error
    }
  }
}
</script>

<style scoped>
</style>
