<template>
  <div>
    <div class="container mx-auto mt-10 px-4">
      <div
        class="flex flex-col gap-4 mx-auto max-w-xl border border-primary rounded p-10"
      >
        <h2 class="text-xl text-center">{{ formTitle }}</h2>
        <div class="alert alert-success" v-show="success">
          {{ successMessage }}
        </div>
        <form @submit.prevent="handleSubmit">
          <div class="my-4">
            <label class="form-control w-full max-w-lg">
              <div class="label">
                <span class="label-text">Title</span>
              </div>
              <input
                type="text"
                v-model="localTitle"
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
                v-model="localBody"
                name="body"
                class="input input-bordered w-full max-w-lg"
                required
              ></textarea>
            </label>
          </div>
          <div class="my-10">
            <button type="submit" class="btn btn-primary text-white w-full">
              {{ buttonText }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieForm",
  props: {
    formTitle: String,
    successMessage: String,
    buttonText: String,
    handleSubmit: Function,
    title: String,
    body: String,
    success: Boolean,
  },
  data() {
    return {
      localTitle: this.title,
      localBody: this.body,
    };
  },
  watch: {
    title(newVal) {
      this.localTitle = newVal;
    },
    body(newVal) {
      this.localBody = newVal;
    },
    localTitle() {
      this.emitUpdate();
    },
    localBody() {
      this.emitUpdate();
    },
  },
  methods: {
    emitUpdate() {
      this.$emit("update:title", this.localTitle);
      this.$emit("update:body", this.localBody);
    },
  },
};
</script>

<style scoped>
/* Add any specific styling for your form here */
</style>
