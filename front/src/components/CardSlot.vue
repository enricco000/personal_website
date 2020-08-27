<template>
  <v-row>
    <v-container
    fluid>

      <v-card
      shaped
      class="pt-2">

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
  </v-row>
</template>

<script>
export default {
  name: 'CardSlot',
  props: [
    'CardText',
    'BottomCard'
  ]
}
</script>

<style scoped>
</style>
