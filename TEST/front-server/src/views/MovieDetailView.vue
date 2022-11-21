<template>
  <div class="row g-0">
    <div class="col-md-4">
      <img :src="poster_path" class="img-fluid rounded-start" alt="그림" style="height: 100%" />
    </div>
    <p>영화 제목 : {{ movieInfo?.title }}</p>
    <p>줄거리 : {{ movieInfo?.overview }}</p>
    
    <hr>
    <h1>후기 목록</h1>
    <p>제목 : {{ review?.title}}</p>
    <p>내용 : {{ review?.content}}</p>
    <p>순위 : {{ review?.rank}}</p>
    <router-link :to="{ name: 'MovieView',}">
      [BACK]
    </router-link>
  </div>
</template>

<script>
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'MovieDetailView',
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
    this.getReviews()
  },
  methods: {
    getMovieDetail() {
      axios({
        method: 'get',
        url: `${API_URL}/api/v1/movies/${this.$route.params.id}`
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
    getReviews() {
      axios({
        method: 'get',
        url: `${API_URL}/api/v1/community/${this.$route.params.id}/reviews/`
      })
        .then((res) => {
          console.log(res)
          this.review = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
}
</script>
