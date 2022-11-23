<template>
  <div>
    <p @click="updateArticleCommentStatus">{{ comment.content }}</p>
  </div>
</template>

<script>
export default {
  name: "ArticleCommentListItem",
  props: {
    comment: Object,
  },
  methods: {
    updateArticleCommentStatus() {
      this.$store.dispatch("updateArticleCommentStatus", this.comment)
    },
  },
}
</script>

<style>

</style>
