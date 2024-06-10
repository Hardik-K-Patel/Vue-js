<template>
<div id="app">
  <p>
    <!-- use router-link component for navigation. -->
    <!-- specify the link by passing the `to` prop. -->
    <!-- `<router-link>` will be rendered as an `<a>` tag by default -->
    <router-link to="/create" class="router-link-space">Create Movie</router-link>
    <router-link to="/">Home Page</router-link>
  </p>
  <!-- route outlet -->
  <!-- component matched by the route will render here -->

  <router-view :movies="movies" :genres="genres" :movie="movie"></router-view>
</div>
</template>

<script>
export default {
  name: 'App',
  props: {
    movies: Array,
    genres: Array,
    movie: Array
  },

};
</script>

<style scoped>
/* Your scoped styles */
.router-link-space {
  margin-right: 10px;
}
</style>
