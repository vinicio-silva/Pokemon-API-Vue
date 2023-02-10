<template>
  <Toolbar />
  <v-form ref="form" v-model="valid">
    <v-container class="px-0">
      <v-row class="justify-center">
        <v-col cols="6" class="text-center">
          <img src="../assets/pokemon-logo.png" alt="pokemon-logo" style="height: 200px;">
          <v-row>
            <v-text-field v-model="form.nome" :rules="nomeRules" placeholder="Procure um nome de um Pokemon"
              required></v-text-field>
            <v-btn color="#3D3D3D" class="text-white mt-1 mx-3" height="50px" @click="validate">
              Procurar
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
      <v-divider class="my-10"></v-divider>
      <div class="mt-10" v-if="this.pokemon_1.length">
        <v-card class="mx-auto" max-width="250" variant="elevated" color="#FAFAFA" :to="{name: 'pokemon-info', params: {name: this.pokemon_1[0].name}}">
          <v-card-item class="d-flex justify-center">
            <div>
              <div class="text-overline mb-1">
                <img :src="this.pokemon_1[0].sprites.front_default" alt="pokemon-logo" style="height: 100px;">
              </div>
              <div class="text-uppercase font-weight-bold mb-1 text-center">
                <div> {{ this.pokemon_1[0].name }}</div>
              </div>
            </div>
          </v-card-item>
        </v-card>
        <div v-if="this.pokemon_2.length">
          <div class="d-flex justify-center mt-5">
            <v-icon size="40" color="#3D3D3D">
              mdi-arrow-down-bold-box
            </v-icon>
          </div>
          <v-row class="justify-center">
            <div class="ma-8" v-for="pokemon in this.pokemon_2">
              <v-card class="mx-auto" min-width="250" variant="elevated" color="#FAFAFA" :to="{name: 'pokemon-info', params: {name: pokemon.name}}">
                <v-card-item class="d-flex justify-center">
                  <div>
                    <div class="text-overline mb-1">
                      <img :src="pokemon.sprites.front_default" alt="pokemon-logo" style="height: 100px;">
                    </div>
                    <div class="text-uppercase font-weight-bold mb-1 text-center">
                      <div>{{ pokemon.name }}</div>
                    </div>
                  </div>
                </v-card-item>
              </v-card>
            </div>
          </v-row>
        </div>
        <div v-if="this.pokemon_3.length">
          <div class="d-flex justify-center mb-5">
              <v-icon size="40" color="#3D3D3D">
                mdi-arrow-down-bold-box
              </v-icon>
            </div>
          <v-card class="mx-auto" max-width="250" variant="elevated" color="#FAFAFA" :to="{name: 'pokemon-info', params: {name: this.pokemon_3[0].name}}">
            <v-card-item class="d-flex justify-center">
              <div>
                <div class="text-overline mb-1">
                  <img :src="this.pokemon_3[0].sprites.front_default" alt="pokemon-logo" style="height: 100px;">
                </div>
                <div class="text-uppercase font-weight-bold mb-1 text-center">
                  <div> {{ this.pokemon_3[0].name }}</div>
                </div>
              </div>
            </v-card-item>
          </v-card>
        </div>
      </div>
    </v-container>
  </v-form>
</template>

<script>
import Toolbar from '@/components/Toolbar.vue';
import axios from 'axios';
export default {
  components: {
    Toolbar
  },
  data() {
    return {
      valid: false,
      form: {
        nome: '',
      },
      nomeRules: [
        v => !!v || 'Digite o nome de um pokemon',
      ],
      pokemon_1: [],
      pokemon_2: [],
      pokemon_3: [],
      pokemon_species: '',
    }
  },
  methods: {
    async validate() {
      const { valid } = await this.$refs.form.validate()

      if (valid) {
        this.resetData();
        this.getPokemonSpecies(this.form.nome.toLowerCase());
      }
    },
    getPokemon(name, arrayType) {
      axios.get('https://pokeapi.co/api/v2/pokemon/' + name)
        .then(response => {
          if (arrayType == 1) {
            this.pokemon_1.push(response.data);
          } else if (arrayType == 2) {
            this.pokemon_2.push(response.data);
          } else if (arrayType == 3) {
            this.pokemon_3.push(response.data);
          }
        })
    },
    getPokemonSpecies(name) {
      axios.get('https://pokeapi.co/api/v2/pokemon-species/' + name)
        .then(response => {
          this.getEvolution(response.data.evolution_chain.url)
          this.pokemon_species = response.data;
        })
        .catch(function (error) {
          alert("Não foi possível encontrar esse pokemon");
        });;
    },
    getEvolution(url) {
      axios.get(url)
        .then(response => {
          this.getPokemon(response.data.chain.species.name, 1);
          if (response.data.chain.evolves_to.length) {
            response.data.chain.evolves_to.forEach(element => {
              this.getPokemon(element.species.name, 2);
              if (element.evolves_to.length) {
                this.getPokemon(element.evolves_to[0].species.name, 3);
              }
            });
          }
        })
    },
    resetData() {
      this.pokemon_1 = [];
      this.pokemon_2 = [];
      this.pokemon_3 = [];
      this.pokemon_species = '';
    }
  },
}
</script>
