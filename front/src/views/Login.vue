<template>
  <v-container
  fluid>
    <card-slot>

      <div slot="CardTitle">
        Iniciar Sesión
      </div>

      <div slot="CardText">
        <v-form>
          <v-text-field
          v-model="username"
          label="Nombre de usuario*"
          name="username"
          text="username"
          :rules="[rules.required]"
          prepend-inner-icon="person">
          </v-text-field>

          <v-text-field
            v-model="password"
            label="Contraseña*"
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
        :timeout="snackbarRules.timeout">
          {{ snackbarRules.text }}
          <v-btn
            color="green"
            text
            @click="snackbarRules.snackbar = false">
            OK
          </v-btn>
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
            Iniciar Sesión
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
        required: value => !!value || 'Requerido'
      },
      snackbarRules: {
        snackbar: false,
        text: '¡Inicio de sesión exitoso!',
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
