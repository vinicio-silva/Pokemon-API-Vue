// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Lista from '@/views/Lista.vue'
import PokemonInfo from '@/views/PokemonInfo.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/lista', component: Lista },
  { path: '/pokemon-info/:name', component: PokemonInfo, name: 'pokemon-info', props: true },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
