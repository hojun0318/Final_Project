import Vue from 'vue'
import VueRouter from 'vue-router'
import MovieView from '@/views/MovieView'
import CreateView from '@/views/CreateView'
import MovieDetailView from '@/views/MovieDetailView'
import SignUpView from '@/views/SignUpView'
import LogInView from '@/views/LogInView'
import RecommendView from '@/views/RecommendView'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MovieView',
    component: MovieView
  },

  {
    path: '/create',
    name: 'CreateView',
    component: CreateView
  },

  {
    path: '/signup',
    name: 'SignUpView',
    component: SignUpView
  },

  {
    path: '/login',
    name: 'LogInView',
    component: LogInView
  },

  {
    path: '/:id',
    name: 'MovieDetailView',
    component: MovieDetailView,
  },
  {
    path: '/recommend',
    name: 'RecommendView',
    component: RecommendView
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
