<template>
  <v-container
  fluid
  class="pt-2 pb-2">

    <v-row>
      <v-col
      cols="12">
         <v-card
        color="secondary"
        class="white--text pa-0"
        elevation=8
        shaped>
          <v-card-title
          class="text-h3">
            Sign up
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>

    <card-slot>

      <div slot="CardText">
        <v-form>
          <v-text-field
          label="Username*"
          name="username"
          text="username"
          :rules="[rules.required]"
          autocomplete="new-user"
          prepend-inner-icon="person"
          v-model="username"
          v-mutate="() => onMutate()"
          >
          </v-text-field>

          <v-text-field
          label="Email*"
          name="email"
          text="email"
          :rules="[rules.required]"
          autocomplete="new-email"
          prepend-inner-icon="mdi-email"
          v-model="email"
          v-mutate="() => onMutate()"
          >
          </v-text-field>

          <v-text-field
          v-model="password"
          label="Password*"
          name="password"
          :type="show1 ? 'text' : 'password'"
          :rules="[rules.required, rules.min]"
          autocomplete="new-password"
          :prepend-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:prepend-inner="show1 = !show1">
          </v-text-field>

          <v-text-field
          v-if="password"
          v-model="reTypePassword"
          label="Retype password*"
          name="password"
          :type="show2 ? 'text' : 'password'"
          :rules="[rules.matchingPasswords, rules.min]"
          autocomplete="new-password"
          :prepend-inner-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:prepend-inner="show2 = !show2">
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
      class="pr-6 pb-4"
      slot="BottomCard">
          <v-row
          :justify="'end'">
          <v-btn
          :disabled="!passwordsMatch || error !== null"
          @click="register()"
          color="secondary"
          class="white--text"
          >
            Create Account
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
      email: '',
      password: '',
      reTypePassword: '',
      show1: false,
      show2: false,
      error: 'Error',
      rules: {
        required: value => !!value || 'Required',
        min: value => value.length >= 8 || 'Must be at least 8 alphanumeric characters',
        matchingPasswords: value => value === this.password || 'Passwords do not match'
      },
      snackbarRules: {
        snackbar: false,
        text: 'Success!',
        timeout: 1000
      }
    }
  },
  methods: {
    async register () {
      try {
        const response = await AuthenticationService.register({
          username: this.username,
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.snackbarRules.snackbar = true
        this.error = null
        setTimeout(() => this.$router.push({ name: 'Signin' }), 1250)
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    onMutate () {
      this.error = null
    }
  },
  computed: {
    passwordsMatch: function () {
      if (this.password === '' || this.reTypePassword === '') {
        return false
      } else {
        return this.password === this.reTypePassword
      }
    }
  }
}
</script>

<style scoped>
</style>
