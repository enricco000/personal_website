import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#ff4447',
        secondary: '#006C84',
        tertiary: '#20232a',
        quaternary: '#e5e5dc'
      }
    }
  }
})

export default vuetify
