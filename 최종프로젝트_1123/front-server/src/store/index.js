import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
import router from '@/router'

Vue.use(Vuex)


const API_URL = 'http://127.0.0.1:8000'


export default new Vuex.Store({
  plugins: [
    createPersistedState()
  ],
  state: {
    movies: [],
    articles: [],
    token: null,
    bestMovieList: [],
    recommend_movies: [],
    articleCommentLists: [],
    watchLists: [],
  },
  getters: {
    isLogin(state) {
      return state.token ? true : false
    }
  },
  mutations: {
    GET_MOVIES(state, movies) {
      state.movies = movies
    },
    GET_RECOMMEND(state, recommend_movies) {
      state.recommend_movies = recommend_movies
    },
    GET_ARTICLES(state, articles) {
      state.articles = articles
    },
    CREATE_ARTICLE_COMMENT(state, articleCommentItem) {
      state.articleCommentLists.push(articleCommentItem)
    },
    UPDATE_ARTICLE_COMMENT_STATUS(state, articleCommentItem) {
      state.articleCommentLists = state.articleCommentLists.map((comment) => {
        if (comment === articleCommentItem) {
          comment.isArticleCommended = !comment.isArticleCommended
        }
        return comment
      })
    },
    CREATE_WATCH(state, watchItem) {
      state.watchLists.push(watchItem)
    },
    UPDATE_WATCH_STATUS(state, watchItem) {
      state.watchLists = state.watchLists.map((watch) => {
        if (watch === watchItem) {
          watch.isWatched = !watch.isWatched
        }
        return watch
      })
    },
    // 회원가입 && 로그인
    SAVE_TOKEN(state, token) {
      state.token = token
      router.push({ name: 'MovieView' })
    }
  },
  actions: {
    getMovies(context) {
      axios({
        method: 'get',
        url: `${API_URL}/movies/`,
        headers: {
          Authorization: `Token ${context.state.token}`
        }
      })
        .then((res) => {
          context.commit('GET_MOVIES', res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getRecommend(context) {
      axios({
        method: 'get',
        url: `${API_URL}/movies/recommend/`,
        headers: {
          Authorization: `Token ${context.state.token}`
        }
      })
        .then((res) => {
          console.log(res.data.title)
          context.commit('GET_RECOMMEND', res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getArticles(context) {
      axios({
        method: 'get',
        url: `${API_URL}/articles/`,
        headers: {
          Authorization: `Token ${context.state.token}`
        }
      })
        .then((res) => {
          context.commit('GET_ARTICLES', res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    signUp(context, payload) {
      axios({
        method: 'post',
        url: `${API_URL}/accounts/signup/`,
        data: {
          username: payload.username,
          password1: payload.password1,
          password2: payload.password2,
        }
      })
        .then((res) => {
          // console.log(res)
          context.commit('SAVE_TOKEN', res.data.key)
        })
    },
    logIn(context, payload) {
      axios({
        method: 'post',
        url: `${API_URL}/accounts/login/`,
        data: {
          username: payload.username,
          password: payload.password,
        }
      })
        .then((res) => {
          // console.log(res)
          context.commit('SAVE_TOKEN', res.data.key)
        })
    },
    createArticleComment(context, articleCommentContent) {
      const articleCommentItem = {
        content: articleCommentContent,
        isArticleCommented: false,
      }
      context.commit("CREATE_ARTICLE_COMMENT", articleCommentItem)
    },
    updateArticleCommentStatus(context, articleCommentItem) {
      context.commit("UPDATE_ARTICLE_COMMENT_STATUS", articleCommentItem)
    },
    createWatch(context, watchTitle) {
      const watchItem = {
        title: watchTitle,
        isWatched: false,
      }
      context.commit("CREATE_WATCH", watchItem)
    },
    updateWatchStatus(context, watchItem) {
      context.commit("UPDATE_WATCH_STATUS", watchItem)
    },
  },
  modules: {
  }
})
