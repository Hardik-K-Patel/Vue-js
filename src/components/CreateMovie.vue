<template id="create-movie">
  <div>
    <Navbar title="New Movie" />

    <div class="container mx-auto mt-10 px-4">
      <div
        class="flex flex-col gap-4 mx-auto max-w-xl border border-primary rounded p-10"
      >
        <h2 class="text-xl text-center">Create movie</h2>
        <div class="alert alert-success" v-show="success">
          Movie created successfully
        </div>
        <form v-on:submit="createTheMovie">
          <div class="my-4">
            <label class="form-control w-full max-w-lg">
              <div class="label">
                <span class="label-text">Title</span>
              </div>
              <input
                type="text"
                v-model="title"
                name="title"
                class="input input-bordered w-full max-w-lg"
                required
              />
            </label>
          </div>
          <div class="my-4">
            <label class="form-control w-full max-w-lg">
              <div class="label">
                <span class="label-text">Summary</span>
              </div>
              <textarea
                type="text"
                v-model="body"
                name="title"
                class="input input-bordered w-full max-w-lg"
                required
              ></textarea>
            </label>
          </div>
          <div class="my-10">
            <button type="submit" class="btn btn-primary text-white w-full">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "@/components/Navbar.vue";

export default {
  name: "CreateMovie",
  components: {
    Navbar,
  },
  data() {
    return {
      title: "",
      body: "",
      success: "",
    };
  },
  methods: {
    createTheMovie: function (event) {
      event.preventDefault();
      console.log("creating movie");
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

      console.log(data, "data");
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Basic YWRtaW46YWRtaW4=",
      };
      axios.post(
        "https://drupal-vue.ddev.site/node?_format=json",
        data,
        { headers },
        function (response) {
          this.success = true;
          console.log(response, "response");
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
