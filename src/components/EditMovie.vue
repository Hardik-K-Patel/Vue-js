<template>
  <div>
    <Navbar title="Edit Movie" />

    <MovieForm
      form-title="Edit Movie"
      success-message="Movie updated successfully"
      button-text="Update"
      :handle-submit="updateTheMovie"
      :title="title"
      :body="body"
      :success="success"
      @update:title="title = $event"
      @update:body="body = $event"
    />
  </div>
</template>

<script>
var movies_data = [];
import axios from "axios";
import Navbar from "@/components/Navbar.vue";
import MovieForm from "@/components/MovieForm.vue";

var apiURL = "https://drupal-vue.ddev.site/api/movies/";
export default {
  name: "EditMovie",
  components: {
    Navbar,
    MovieForm,
  },
  data() {
    return {
      title: "",
      body: "",
      success: false,
      movies: [],
    };
  },
  mounted: function () {
    this.getTheMovie();
  },
  methods: {
    getTheMovie: function () {
      axios
        .get(apiURL + this.$route.params.edit)
        .then((response) => {
          // Update movies data
          movies_data = response.data; // Use response.data, not response.body
          this.movies = movies_data;
          this.title = movies_data[0].title[0].value;
          this.body = movies_data[0].body[0].value;
        })
        .catch((error) => {
          console.error("Error fetching movies:", error);
        });
    },
    updateTheMovie: function (event) {
      event.preventDefault();
      var data = {
        type: [
          {
            target_id: "movies",
            target_type: "node_type",
          },
        ],
        title: [
          {
            value: this.title,
          },
        ],
        body: [
          {
            value: this.body,
          },
        ],
      };

      const headers = {
        "Content-Type": "application/json",
        Authorization: "Basic YWRtaW46YWRtaW4=",
      };
      var updateURL =
        "https://drupal-vue.ddev.site/node/" + this.$route.params.edit;
      axios.patch(updateURL, data, { headers }, function () {
        this.success = true;
      });
      this.success = true;
      //  this.$router.push('/');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
