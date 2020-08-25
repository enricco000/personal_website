<template>
  <div id="app">
    <v-app>

      <v-container
      class="pb-5">
        <page-header />
      </v-container>

      <v-container
      class="pt-5 pb-16">
        <router-view />
      </v-container>

      <v-container
      class="pt-5">
        <page-footer />
      </v-container>

    </v-app>
  </div>
</template>

<script>
import PageHeader from '@/components/Header.vue'
import PageFooter from '@/components/Footer.vue'
export default {
  name: 'App',
  components: {
    PageHeader,
    PageFooter
  }
}
</script>

<style lang="scss">
  #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
