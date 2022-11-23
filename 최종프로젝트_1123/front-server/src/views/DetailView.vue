<template>
  <div>
    <p>제목 : {{ article?.title }}</p>
    <p>내용 : {{ article?.content }}</p>
    <br />
    <ArticleCommentForm />
    <ArticleCommentList />
    <hr>
    <router-link :to="{ name: 'ArticleView' }">뒤로가기</router-link>
  </div>
</template>

<script>
import axios from "axios";
import ArticleCommentList from '@/components/ArticleCommentList'
import ArticleCommentForm from '@/components/ArticleCommentForm'

const API_URL = "http://127.0.0.1:8000";

export default {
  name: "DetailView",
  components: {
    ArticleCommentList,
    ArticleCommentForm,
  },
  data() {
    return {
      article: null,
      article_comment: null,
    };
  },
  created() {
    this.getArticleDetail();
  },
  methods: {
    getArticleDetail() {
      axios({
        method: "get",
        url: `${API_URL}/articles/${this.$route.params.id}`,
      })
        .then((res) => {
          console.log(res);
          this.article = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
