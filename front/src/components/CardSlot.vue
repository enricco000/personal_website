<template>

  <v-container
  fluid>

    <v-card
    hover>
      <v-toolbar
      color="secondary"
      dark>

        <v-toolbar-title>
          <h2>
            <slot name="CardTitle">
              Default Card Title
            </slot>
          </h2>
        </v-toolbar-title>

      </v-toolbar>

      <v-card-text>
        <slot name="CardText">
        <div class="text-left">
          Default Card Text
        </div>
        </slot>
      </v-card-text>

      <slot name="BottomCard"></slot>

    </v-card>

  </v-container>
</template>

<script>
export default {
  name: 'CardSlot',
  props: [
    'CardTitle',
    'CardText',
    'BottomCard'
  ]
}
</script>

<style scoped>
</style>
