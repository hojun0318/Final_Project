<template>
  <div>
    <h1>영화 정보</h1>
    <!-- <img :src="this.movieInfoURL" class="card-img-top" alt="..." /> -->
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
      review: [],
    }
  },
  computed: {
    movieInfoURL() {
      return `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${this.movieInfo.poster_path}`
    },
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
