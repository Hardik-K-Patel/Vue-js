
<template>

    <div>

        <router-link to="/">Back to Home</router-link>
     <div class="single-movie-list">
                    <h4>{{ movie[0].title[0].value }}</h4>
                    <p>
                        <strong>Directors:</strong> {{ movie[0].field_director[0].value }}
                    </p>
                    <strong>Actors:</strong><br>
                    <span v-for="actor in movie[0].field_actors" :key="actor.id">{{ actor.value }}<br></span>
                    <strong>Genre:</strong>
                    <span v-for="genre in movie[0].field_genres" :key="genre.id">{{ genre.value }},</span>
                    <hr>
                    <img :src="movie[0].field_movie_poster[0].url" :alt="movie[0].field_movie_poster[0].alt">
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
    getTheMovie: function(movieID) {
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
