<template>

    <div>

        <input type="text" class="form-control" v-model="searchQuery" placeholder="Search by title">

        <h4>Filter by Genre:</h4>
        <div class="row">
            <div class="col-md-6">
                <select class="form-control" v-model="selectedGenre">
                    <option value="">All</option>
                    <option v-for="(genre, index) in genres" :key="index">{{ genre }}</option>
                </select>
            </div>
        </div>

        <h2>Movies</h2>
        <div v-if="filteredMovies.length === 0">No movies available</div>
        <div v-else>
            <div class="movie-list">
                <div v-for="movie in filteredMovies" :key="movie.id">
                    <h4>
                        <router-link :to="{ name: 'movie', params: { movie: movie.nid[0].value }}">{{ movie.title[0].value }}</router-link>
                    </h4>
                    <p>
                        <strong>Directors:</strong> {{ movie.field_director[0].value }}
                    </p>
                    <strong>Actors:</strong><br>
                    <span v-for="actor in movie.field_actors" :key="actor.id">{{ actor.value }}<br></span>
                    <strong>Genre:</strong>
                    <span v-for="genre in movie.field_genres" :key="genre.id">{{ genre.value }},</span>
                    <hr>
                    <img :src="movie.field_movie_poster[0].url" :alt="movie.field_movie_poster[0].alt">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HomePage',
    props: {
        movies: Array,
        genres: Array,
    },
    data() {
        return {
            searchQuery: '', // Store the search query
            selectedGenre: '', // Store the selected genre
        };
    },
    computed: {
        filteredMovies() {
            if (!this.movies) return []; // Return an empty array if movies is undefined
            let filtered = this.movies;

            // Filter by title
            if (this.searchQuery.trim() !== '') {
                filtered = filtered.filter(movie =>
                    movie.title[0].value.toLowerCase().includes(this.searchQuery.trim().toLowerCase())
                );
            }

            // Filter by genre
            if (this.selectedGenre !== '') {
                filtered = filtered.filter(movie =>
                    movie.field_genres.some(genre => genre.value.toLowerCase() === this.selectedGenre.toLowerCase())
                );
            }

            return filtered;
        }
    },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
