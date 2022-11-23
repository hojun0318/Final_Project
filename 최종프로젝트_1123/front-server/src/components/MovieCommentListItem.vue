<template>
  <div>
    <p @click="updateWatchStatus" :class="{ 'is-watched': watch.isWatched }">{{ watch.title }}</p>
  </div>
</template>

<script>
export default {
  name: "MovieCommentListItem",
  props: {
    watch: Object,
  },
  methods: {
    updateWatchStatus() {
      this.$store.dispatch("updateWatchStatus", this.watch)
    },
  },
}
</script>

<style>

</style>
