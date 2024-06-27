<template>
  <div class="w-full mb-16">
    <div class="hero min-h-screen" :style="backgroundImageStyle">
      <div class="hero-overlay bg-opacity-60"></div>
      <div class="hero-content text-center text-neutral-content">
        <div class="max-w-md">
          <h1 class="mb-5 text-5xl font-bold">Blockbuster Movies</h1>
          <p class="mb-5">
            From heart-pounding action and thrilling adventures to touching
            dramas and hilarious comedies
          </p>

          <router-link to="/create" class="btn btn-primary"
            >Create Movie</router-link
          >
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-10 mx-auto w-3/4 my-24">
      <div
        class="navbar bg-base-300 rounded-box flex-wrap flex-col lg:flex-row gap-2"
      >
        <div class="flex-1 px-2 lg:flex-none">
          <a class="text-lg font-bold">Movies List</a>
        </div>
        <div
          class="flex flex-wrap flex-col flex-1 px-2 gap-4 lg:flex-row lg:justify-end"
        >
          <label class="input input-bordered flex items-center gap-2">
            <input
              type="text"
              class="grow"
              placeholder="Search by title"
              v-model="searchQuery"
            />
          </label>

          <div class="relative">
            <button
              @click="toggleDropdown"
              class="bg-transparent text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:ring-0 focus:transparent focus:border-none"
            >
              {{ selectedGenre || "All" }}
              <svg
                class="w-4 h-4 ml-2 inline"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            <div
              v-if="isDropdownOpen"
              class="absolute mt-2 w-48 bg-neutral-content border border-gray-300 rounded shadow-lg z-10 lg:right-0"
            >
              <div
                @click="selectGenre('')"
                class="px-4 py-2 cursor-pointer hover:bg-gray-200"
              >
                All
              </div>
              <div
                v-for="(genre, index) in genres"
                :key="index"
                @click="selectGenre(genre)"
                class="px-4 py-2 cursor-pointer hover:bg-gray-200"
              >
                {{ genre }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="filteredMovies.length === 0">No movies available</div>
      <div v-else>
        <div class="flex flex-col gap-10">
          <div
            v-for="movie in filteredMovies"
            :key="movie.id"
            class="card flex-col card-side bg-base-100 shadow-xl lg:flex-row lg:max-h-96"
          >
            <figure class="w-full rounded-s-none lg:rounded-s-2xl lg:w-2/5">
              <img
                v-if="movie.field_movie_poster && movie.field_movie_poster[0]"
                :src="movie.field_movie_poster[0].url"
                :alt="movie.field_movie_poster[0].alt"
              />
              <img
                v-else
                src="@/assets/placeholder.png"
                alt="Placeholder image"
              />
            </figure>
            <div class="card-body w-full lg:w-3/5">
              <h2
                v-if="movie.title && movie.title[0] && movie.title[0].value"
                class="card-title"
              >
                <router-link
                  :to="{ name: 'movie', params: { movie: movie.nid[0].value } }"
                  >{{ movie.title[0].value }}</router-link
                >
              </h2>
              <p
                v-if="movie.body && movie.body[0] && movie.body[0].value"
                class="overflow-hidden"
              >
                <span v-html="movie.body[0].value"></span>
              </p>
              <p
                v-if="
                  movie.field_director &&
                  movie.field_director[0] &&
                  movie.field_director[0].value
                "
              >
                <span class="font-bold inline mr-2">Director</span>
                {{ movie.field_director[0].value }}
              </p>
              <div v-if="movie.field_actors && movie.field_actors.length > 0">
                <p class="font-bold inline mr-2">Actors</p>
                <div class="inline-flex flex-wrap gap-2">
                  <span
                    v-for="(actor, index) in movie.field_actors"
                    :key="actor.id"
                  >
                    {{ actor.value }}
                    <span v-if="index < movie.field_actors.length - 1">|</span>
                  </span>
                </div>
              </div>
              <div
                v-if="movie.field_genres && movie.field_genres.length > 0"
                class="flex gap-3 my-2"
              >
                <span
                  v-for="genre in movie.field_genres"
                  :key="genre.id"
                  class="badge badge-lg"
                  >{{ genre.value }}</span
                >
              </div>

              <div class="card-actions md:justify-end">
                <router-link
                  class="btn btn-outline"
                  :to="{ name: 'edit', params: { edit: movie.nid[0].value } }"
                  >Edit
                </router-link>
                <button
                  class="btn btn-accent"
                  @click="openDeleteModal(movie.nid[0].value)"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <DeleteMovie
      :isOpen="isDeleteModalOpen"
      :id="movieId"
      @close="closeDeleteModal"
    />
  </div>
</template>

<script>
import DeleteMovie from "@/components/DeleteMovie.vue";

export default {
  name: "HomePage",
  components: {
    DeleteMovie,
  },
  props: {
    movies: Array,
    genres: Array,
  },
  data() {
    return {
      searchQuery: "",
      selectedGenre: "",
      isDropdownOpen: false,
      isDeleteModalOpen: false,
      movieId: null,
      backgroundImageStyle: {
        backgroundImage: `url(${require("@/assets/film.jpg")})`,
      },
    };
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    selectGenre(genre) {
      this.selectedGenre = genre;
      this.isDropdownOpen = false;
    },
    openDeleteModal(movie) {
      this.movieId = movie;
      this.isDeleteModalOpen = true;
    },
    closeDeleteModal() {
      this.isDeleteModalOpen = false;
      this.movieId = null;
    },
  },
  computed: {
    filteredMovies() {
      if (!this.movies) return []; // Return an empty array if movies is undefined
      let filtered = this.movies;

      // Filter by title
      if (this.searchQuery.trim() !== "") {
        filtered = filtered.filter((movie) =>
          movie.title[0].value
            .toLowerCase()
            .includes(this.searchQuery.trim().toLowerCase())
        );
      }

      // Filter by genre
      if (this.selectedGenre !== "") {
        filtered = filtered.filter((movie) =>
          movie.field_genres.some(
            (genre) =>
              genre.value.toLowerCase() === this.selectedGenre.toLowerCase()
          )
        );
      }

      return filtered;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* Add any additional custom styles here if needed */
</style>
