<template>
  <v-container
  fluid>

  <v-container
    class="pb-3 pl-0 pr-0 pt-2">
      <v-card
      color="secondary"
      class="white--text pa-0"
      elevation=8
      shaped>
        <v-card-title
        class="text-h3">
          Sign in
        </v-card-title>
      </v-card>
    </v-container>

    <card-slot
    class="pb-10">

      <div slot="CardText">
        <v-form>
          <v-text-field
          v-model="username"
          label="Username*"
          name="username"
          text="username"
          :rules="[rules.required]"
          prepend-inner-icon="person">
          </v-text-field>

          <v-text-field
            v-model="password"
            label="Password*"
            name="password"
            :type="show ? 'text' : 'password'"
            :rules="[rules.required]"
            autocomplete="new-password"
            :prepend-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            @click:prepend-inner="show = !show">
            </v-text-field>
        </v-form>

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
          :disabled="!enteredCredentials"
          @click="login()"
          color="secondary"
          class="white--text"
          >
            Sign in
          </v-btn>
        </v-row>
      </v-card-actions>

    </card-slot>
  </v-container>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService.js'
import CardSlot from '@/components/CardSlot'

export default {
  components: {
    CardSlot
  },
  data () {
    return {
      username: '',
      password: '',
      show: false,
      error: null,
      rules: {
        required: value => !!value || 'Required'
      },
      snackbarRules: {
        snackbar: false,
        text: 'Correctly signed in!',
        timeout: 1000
      }
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          username: this.username,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$store.dispatch('setIsAdmin', response.data.user.isAdmin)
        this.snackbarRules.snackbar = true
        this.error = null
        setTimeout(() => this.$router.push('/'), 1250)
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  },
  computed: {
    enteredCredentials: function () {
      return this.email !== '' && this.password !== ''
    }
  }
}
</script>

<style scoped>
</style>
