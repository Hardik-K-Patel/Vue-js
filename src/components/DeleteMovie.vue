<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50"
  >
    <div class="modal-box">
      <h3 class="font-bold text-lg">Confirm Delete</h3>

      <p class="py-4 text-sm text-gray-500">
        Are you sure you want to delete this movie?
      </p>

      <div class="modal-action">
        <form method="dialog">
          <button type="button" class="btn btn-ghost" @click="close">No</button>
          <button type="button" class="btn btn-accent" @click="confirmDelete">
            Yes
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
var apiURL = "https://drupal-vue.ddev.site/node/";

export default {
  name: "DeleteMovie",
  props: {
    isOpen: Boolean,
    id: Number,
  },
  methods: {
    close() {
      this.$emit("close");
    },
    confirmDelete: function () {
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Basic YWRtaW46YWRtaW4=",
      };
      axios.delete(apiURL + this.id, { headers }, function (response) {
        console.log(response, "response");
      });
      this.$emit("close");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
