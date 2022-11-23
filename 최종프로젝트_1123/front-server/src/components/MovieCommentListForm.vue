<template>
  <div class="container">
    <br />
    <h2>댓글 목록</h2>
    <input id="iput" type="text" v-model.trim="watchTitle" />
    <button @click="createWatch" class="btn btn-primary">완료</button>
    <br />
  </div>
</template>

<script>
export default {
  name: "MovieCommentListForm",
  data: function () {
    return {
      watchTitle: null,
    }
  },
  methods: {
    createWatch() {
      if (this.watchTitle) {
        this.$store.dispatch("createWatch", this.watchTitle)
      }
      this.watchTitle = null
    },
  },
}
</script>

<style>
#iput {
  margin-right: 10px;
  border-radius: 8px;
}

</style>
