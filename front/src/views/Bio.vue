<template>
  <v-container
    class="pb-4 pt-4"
    flex>

    <v-row>
      <v-container>
        <v-card
          color="secondary"
          class="white--text pa-0"
          elevation=8
          shaped>
            <v-card-title
            class="text-h3">
              Bio
            </v-card-title>

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                v-if="$store.state.isUserLoggedin"
                fab
                color="tertiary"
                bottom
                dark
                right
                absolute
                v-bind="attrs"
                v-on="on"
                to="/entry/create"
                >
                  <v-icon>mdi-pen-plus</v-icon>
                </v-btn>
              </template>
              <span>Write new entry</span>
              </v-tooltip>

          </v-card>
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
</script>
