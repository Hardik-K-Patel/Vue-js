<template id="create-movie">
  <div>
    <Navbar title="New Movie" />

    <MovieForm
      form-title="Create Movie"
      success-message="Movie created successfully"
      button-text="Submit"
      :handle-submit="createTheMovie"
      :title="title"
      :body="body"
      :success="success"
      @update:title="title = $event"
      @update:body="body = $event"
    />
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "@/components/Navbar.vue";
import MovieForm from "@/components/MovieForm.vue";

export default {
  name: "CreateMovie",
  components: {
    Navbar,
    MovieForm,
  },
  data() {
    return {
      title: "",
      body: "",
      success: false,
    };
  },
  methods: {
    createTheMovie: function (event) {
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
      axios.post(
        "https://drupal-vue.ddev.site/node?_format=json",
        data,
        { headers },
        function () {
          this.success = true;
        }
      );
      this.success = true;
      this.title = "";
      this.body = "";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
