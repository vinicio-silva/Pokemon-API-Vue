<template>
  <div>
    <Toolbar />
    <v-container class="px-0">
      <v-row class="justify-center mt-10">
        <v-card class="mx-auto" min-width="700" variant="elevated" color="#FAFAFA" v-if="!!this.pokemon">
          <v-card-item class="text-uppercase">
            <h1 class="text-center my-5">{{ this.pokemon.name }}</h1>
            <v-row class="justify-center pa-2">
              <img :src="this.pokemon.sprites.front_default" alt="pokemon-logo" style="height: 400px;">
            </v-row>
            <v-divider class="mb-4" horizontal></v-divider>
            <v-row class="justify-center ma-3 w-100">
              <div class="d-flex flex-column w-50 justify-center">
                <v-row class="ma-2 justify-center" v-for="item in this.pokemon.stats.slice(0,3)">
                  <b>{{ item.stat.name }}:</b>
                  <div>{{ item.base_stat }}</div>
                </v-row>
              </div>
              <div class="d-flex flex-column w-50 justify-center">
                <v-row class="ma-2 justify-center" v-for="item in this.pokemon.stats.slice(3,6)">
                  <b>{{ item.stat.name }}:</b>
                  <div>{{ item.base_stat }}</div>
                </v-row>
              </div>
            </v-row>
          </v-card-item>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Toolbar from '@/components/Toolbar.vue';
import axios from 'axios';
export default {
  props: ['name'],
  components: {
    Toolbar
  },
  data() {
    return {
      pokemon: ''
    }
  },
  created() {
    this.getPokemon(this.name);
  },
  methods: {
    getPokemon(name) {
      axios.get('https://pokeapi.co/api/v2/pokemon/' + name)
        .then(response => {
          this.pokemon = response.data;
          console.log(this.pokemon);
        })
    }
  },
}
</script>
