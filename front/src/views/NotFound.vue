<template>
  <v-container
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
          Not Found
        </v-card-title>
      </v-card>
    </v-container>
    <card-slot>

      <div
      slot="CardText">
        <div
        class="text-center text-h4">
          It's dangerous to go alone!
        </div>
        <div
        class="text-center text-h5">
            Take this.
        </div>
      </div>

      <div
      slot="BottomCard">
        <v-card-actions>
          <v-row
          :justify="'center'">
            <v-btn
            fab
            dark
            color="ternary"
            @click="navigateTo('Home')">
              <v-icon>
                mdi-sword
              </v-icon>
            </v-btn>
          </v-row>
        </v-card-actions>
      </div>

    </card-slot>
  </v-container>
</template>

<script>
import CardSlot from '@/components/CardSlot'

export default {
  name: 'NotFound',
  components: {
    CardSlot
  },
  methods: {
    navigateTo (name) {
      if (this.$route.name !== name) {
        this.$router.push({ name: name })
      }
    }
  }
}
</script>

<style scoped>
</style>
