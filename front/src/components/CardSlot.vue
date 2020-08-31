<template>
    <v-container
    fluid
    class="pt-2 pb-2 pl-0 pr-0">

      <v-card
      shaped>

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
    'CardText',
    'BottomCard'
  ]
}
</script>

<style scoped>
</style>
