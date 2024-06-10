<template>
    <div>

        <h2>Edit movie</h2>
        <div class="alert alert-success" v-show="success">You have updated a movie.</div>
        <form v-on:submit="updateTheMovie">

            <div v-for="movie in movies" :key="movie.nid">
                <div class="form-group">
                    <label>Movie title</label>
                    <input type="text" v-model="title" name="title" class="form-control">
                </div>
                <div class="form-group">
                    <label>Movie body</label>
                    <textarea v-model="body" class="form-control"></textarea>
                </div>
            </div>



            <button type="submit" class="btn btn-success">Update Movie</button>
        </form>

    </div>
</template>

<script>

var movies_data = [];
import axios from 'axios';
var apiURL = "https://drupal-vue.ddev.site/api/movies/";
export default {
    name: 'EditMovie',
    data() {
        return {
            title: '',
            body: '',
            success: '',
            movies: []
        };
    },
    mounted: function () {
        this.getTheMovie();
    },
    methods: {
        getTheMovie: function () {
            axios.get(apiURL + this.$route.params.edit)
                .then((response) => {
                    // Update movies data
                    movies_data = response.data; // Use response.data, not response.body
                    this.movies = movies_data;
                    this.title = movies_data[0].title[0].value;
                    this.body = movies_data[0].body[0].value;

                })
                .catch((error) => {
                    console.error('Error fetching movies:', error);
                });
        },
        updateTheMovie: function (event) {
            event.preventDefault();
            console.log("updating movie");
            var data = {
                "type": [
                    {
                        "target_id": "movies",
                        "target_type": "node_type"
                    }
                ],
                'title': [
                    {
                        'value': this.title
                    }
                ],
                'body': [
                    {
                        'value': this.body
                    }
                ]
            }

            console.log(data, "data");
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Basic YWRtaW46YWRtaW4='
            };
            var updateURL = 'https://drupal-vue.ddev.site/node/' + this.$route.params.edit;
            axios.patch(updateURL, data, { headers }, function (response) {
                this.success = true;
                console.log(response, "response");
            });
            this.success = true;
            this.title = '';
            this.body = '';
            //  this.$router.push('/');


        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
