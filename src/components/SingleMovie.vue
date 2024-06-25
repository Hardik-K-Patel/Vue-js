<template>
  <div>
    <Navbar :title="movie[0].title[0].value" />
    <div class="lg:min-h-screen">
      <img
        v-if="movie[0].field_movie_poster && movie[0].field_movie_poster[0]"
        :src="movie[0].field_movie_poster[0].url"
        :alt="movie[0].field_movie_poster[0].alt"
        class="w-full max-h-screen object-contain"
      />
    </div>
    <div
      class="container flex flex-col gap-6 max-w-2xl mx-auto px-3 my-10 lg:my-24"
    >
      <h4
        v-if="movie[0].title && movie[0].title[0] && movie[0].title[0].value"
        class="text-5xl font-bold text-center mb-4"
      >
        {{ movie[0].title[0].value }}
      </h4>
      <p
        v-if="movie[0].body && movie[0].body[0] && movie[0].body[0].value"
        class="text-justify"
      >
        <span v-html="movie[0].body[0].value"></span>
      </p>
      <div class="flex flex-col lg:flex-row lg:justify-between">
        <div>
          <p
            v-if="
              movie[0].field_director &&
              movie[0].field_director[0] &&
              movie[0].field_director[0].value
            "
          >
            <strong>Directors</strong> {{ movie[0].field_director[0].value }}
          </p>
          <div v-if="movie[0].field_actors && movie[0].field_actors.length > 0">
            <p class="font-bold inline mr-2">Actors</p>
            <div class="inline-flex flex-wrap gap-2">
              <span v-for="actor in movie[0].field_actors" :key="actor.id"
                >{{ actor.value }}<br
              /></span>
            </div>
          </div>
        </div>
        <div
          v-if="movie[0].field_genres && movie[0].field_genres.length > 0"
          class="flex flex-wrap gap-3 my-2 lg:justify-end lg:w-1/2"
        >
          <span
            v-for="genre in movie[0].field_genres"
            :key="genre.id"
            class="badge badge-secondary badge-lg"
            >{{ genre.value }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "@/components/Navbar.vue";
var apiURL = "https://drupal-vue.ddev.site/api/movies";
export default {
  name: "SingleMovie",
  components: {
    Navbar,
  },
  data() {
    return {
      movie: [],
    };
  },
  created() {
    this.getTheMovie(this.$route.params.movie);
  },
  methods: {
    getTheMovie: function (movieID) {
      axios
        .get(apiURL + "/" + movieID)
        .then((response) => {
          this.movie = response.data;
        })
        .catch((error) => {
          console.error("Error fetching movie details:", error);
        });
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
