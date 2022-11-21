<template>
  <div id="app">
    <nav>
      <router-link :to="{ name: 'MovieView' }">Movies</router-link> | 
      <router-link :to="{ name: 'SignUpView' }">SignUpPage</router-link> | 
      <router-link :to="{ name: 'LogInView' }">LogInPage</router-link> |
      <router-link :to="{ name: 'random' }" id="box1">Random </router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import axios from "axios"
export default {
  data() {
    return {
      bestMovieList: [],
    }
  },
  methods: {
    getBestMovieList() {
      const options = {
        url: `https://api.themoviedb.org/3/movie/top_rated`,
        method: "get",
        params: {
          api_key: "c7992d4225ab8697d398df3ac1daaf94",
          language: "ko-KR",
          page: 1,
        },
      }
      axios(options)
        .then((res) => {
          // console.log(res)
          this.bestMovieList = res.data.results
          this.$store.commit("GET_BEST_MOVIE_LIST", this.bestMovieList)
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
  created() {
    this.getBestMovieList()
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
