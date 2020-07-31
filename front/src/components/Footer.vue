<template>
  <v-container
  fluid>
    <v-footer
      :padless="true"
      absolute
    >
      <v-card
        flat
        tile
        width="100%"
        color="primary"
        class="text-center"
      >
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4"
            icon
          >
            <v-icon size="24px">{{ icon }}</v-icon>
          </v-btn>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>
            Author
          </strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-container>
</template>

<script>
export default {
  name: 'Footer',
  data: () => ({
    icons: [
      'mdi-duck',
      'mdi-email',
      'mdi-github'
    ]
  })
}
</script>

<style scoped>
</style>
