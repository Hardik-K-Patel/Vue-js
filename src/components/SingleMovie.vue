
<template>
  <div>

    <router-link to="/">Back to Home</router-link>
    <div class="single-movie-list">
      <h4 v-if="movie[0].title && movie[0].title[0] && movie[0].title[0].value">
        {{ movie[0].title[0].value }}
      </h4>
      <p v-if="movie[0].body && movie[0].body[0] && movie[0].body[0].value">
        <strong>Body:</strong> <span v-html="movie[0].body[0].value"></span>
      </p>
      <p v-if="movie[0].field_director && movie[0].field_director[0] && movie[0].field_director[0].value">
        <strong>Directors:</strong> {{ movie[0].field_director[0].value }}
      </p>
      <div v-if="movie[0].field_actors && movie[0].field_actors.length > 0">
        <strong>Actors:</strong><br>
        <span v-for="actor in movie[0].field_actors" :key="actor.id">{{ actor.value }}<br></span>
      </div>
      <div v-if="movie[0].field_genres && movie[0].field_genres.length > 0">
        <strong>Genre:</strong>
        <span v-for="genre in movie[0].field_genres" :key="genre.id">{{ genre.value }},</span>
      </div>
      <hr v-if="movie[0].field_movie_poster && movie[0].field_movie_poster[0]">
      <img v-if="movie[0].field_movie_poster && movie[0].field_movie_poster[0]" :src="movie[0].field_movie_poster[0].url"
        :alt="movie[0].field_movie_poster[0].alt">
    </div>



  </div>
</template>

<script>
import axios from 'axios';
var apiURL = "https://drupal-vue.ddev.site/api/movies";
export default {
  name: 'SingleMovie',
  data() {
    return {
      movie: [],
    };
  },
  created() {
    //console.log(this.$route.params.movie);
    this.getTheMovie(this.$route.params.movie);
  },
  methods: {
    getTheMovie: function (movieID) {
      console.log("singlemovie");
      axios.get(apiURL + '/' + movieID)
        .then((response) => {
          this.movie = response.data
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.error('Error fetching movie details:', error);
        });
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
