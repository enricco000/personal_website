<template>
  <v-container
  fluid>
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
    v-if="snackbarRules.snackbar"
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
  </v-container>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  name: 'Verify',
  data () {
    return {
      error: null,
      snackbarRules: {
        snackbar: false,
        text: 'Verified! Redirecting to Sign in',
        timeout: 1000
      }
    }
  },
  async created () {
    try {
      await AuthenticationService.verify({
        verificationToken: this.$route.query.verificationToken
      })
      this.snackbarRules = true
      setTimeout(() => this.$router.push({ name: 'Signin' }), 1250)
    } catch (error) {
      this.error = error.response.data.error
    }
  }
}
</script>

<style scoped>
</style>
