<template>
  <div>
    <h1>자유게시판</h1>
    <router-link :to="{ name: 'CreateView' }">[글쓰기]</router-link>
    <hr>
    <ArticleList/>
  </div>
</template>

<script>
import ArticleList from '@/components/ArticleList'


export default {
  name: 'ArticleView',
  components: {
    ArticleList,
  },
  computed:{
    isLogin() {
      return this.$store.getters.isLogin
    }
  },
  created() {
    this.getArticles()
  },
  methods: {
    getArticles() {
      if (this.isLogin === true) { 
        this.$store.dispatch('getArticles')
      } else {
        alert('로그인이 필요한 서비스 입니다.')
        this.$router.push({ name: 'LogInView'})
      }
    }
  }
}
</script>

<style>

</style>
