<template>
  <div class="row g-0">
    <div class="col-md-4">
      <img :src="poster_path" class="img-fluid rounded-start" alt="그림" style="height: 100%" />
    </div>
    <p>영화 제목 : {{ movieInfo?.title }}</p>
    <p>줄거리 : {{ movieInfo?.overview }}</p>
    <hr>
    <div>
    <MovieCommentListForm />
    <MovieCommentList />
    </div>
    <router-link :to="{ name: 'MovieView',}">
      [뒤로가기]
    </router-link>
  </div>
</template>

<script>
import axios from 'axios'
import MovieCommentList from '@/components/MovieCommentList'
import MovieCommentListForm from '@/components/MovieCommentListForm'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'MovieDetailView',
  components: {
    MovieCommentList,
    MovieCommentListForm,
  },
  data() {
    return {
      movieInfo: null,
      review: null,
      poster_path: null,
    }
  },
  props: {
  },
  computed: {
    
  },
  created() {
    this.getMovieDetail()
  },
  methods: {
    getMovieDetail() {
      axios({
        method: 'get',
        url: `${API_URL}/movies/${this.$route.params.id}`
      })
        .then((res) => {
          console.log(res)
          this.movieInfo = res.data
          this.poster_path = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${this.movieInfo.poster_path}`
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>
