<template>
  <div class="navbar bg-base-100">
    <div class="text-sm breadcrumbs">
      <ul>
        <li>
          <router-link to="/">
            <span class="inline-flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="w-4 h-4 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                ></path>
              </svg>
              Home
            </span>
          </router-link>
        </li>

        <li>
          <span class="inline-flex gap-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="64 64 896 896"
              class="w-4 h-4 stroke-current"
            >
              <path
                d="M442.3 677.6l199.4-156.7a11.3 11.3 0 000-17.7L442.3 346.4c-7.4-5.8-18.3-.6-18.3 8.8v313.5c0 9.4 10.9 14.7 18.3 8.9z"
              ></path>
              <path
                d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z"
              ></path>
            </svg>

            {{ title }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped></style>
