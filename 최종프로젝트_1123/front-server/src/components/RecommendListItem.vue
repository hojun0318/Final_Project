<template>
  <div>
    <div class="col">
      <div class="card h-200">
        <img :src="this.movieURL" />
        <div class="card-body">
          <h5 class="text-center" style="font-weight: bold">
            {{ recommend_movie.title }}
          </h5>
          <div class="overview">
            <p>{{ recommend_movie.overview }}</p>
          </div>
          <router-link :to="{ name: 'MovieDetailView', params: { id: recommend_movie.id } }">
            [DETAIL]
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecommendListItem',
  props: {
    recommend_movie: Object,
  },
  computed: {
    movieURL() {
      return `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${this.recommend_movie.poster_path}`
    },
  },
}
</script>

<style>
.overview {
  height: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  line-height: 1.2;
  height: 6em;
  text-align: left;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
}
</style>
