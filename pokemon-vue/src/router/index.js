// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import PokemonInfo from '@/views/PokemonInfo.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/pokemon-info/:name', component: PokemonInfo, name: 'pokemon-info', props: true },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
