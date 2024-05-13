import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';
import jQuery from 'jquery';
import AboutUs from './components/AboutUs.vue';
import HomePage from './components/HomePage.vue';
import SingleMovie from './components/SingleMovie.vue';

import VueRouter from 'vue-router'

Vue.use(VueRouter)

Vue.config.productionTip = false


// Your API URL
var apiURL = "https://drupal-vue.ddev.site/api/movies";

const routes = [
  { path: '/', component: HomePage },
  { path: '/movie/:movie', name: 'movie', component: SingleMovie },
  { path: '/about-us', component: AboutUs },
]
const router = new VueRouter({
  routes // short for `routes: routes`
})

var movies_data = [];
var genresArr = [];
new Vue({
  el: '#app',
  router,
  render: h => h(App, {
    props: {
      movies: [], // Initialize movies array
      genres: [],
      movie: [],
      liveFilter: '',
      genreFilter: '',
    }
  }),
  mounted() {
    console.log("Vue instance mounted");
    this.getMovies();
  },
  methods: {
    getMovies: function() {

        axios.get(apiURL)
        .then((response) => {
          // Update movies data
          movies_data = response.data; // Use response.data, not response.body
          this.$children[0].$props.movies = movies_data;

          jQuery.each(movies_data, function(index, movie){
            jQuery.each(movie.field_genres, function(index, genre){
                if(jQuery.inArray(genre.value, genresArr) === -1) {
                    genresArr.push(genre.value);
                }
            });
        });
        this.$children[0].$props.genres = genresArr;
        })
        .catch((error) => {
          console.error('Error fetching movies:', error);
        });
    },
  }
});


