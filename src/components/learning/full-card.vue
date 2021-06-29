<!-- // Copyright (c) 2021 Steffen Stein <mail@steffenstein.com> For LICENSE see docs/LICENSE -->

<template>
  <div
    class="flex flex-wrap justify-between w-full bg-white rounded-lg"
    :style="styleHeight"
  >
    <div class="w-4/5 h-screen2">
      <video-embed
        css="h-full"
        :params="{ autoplay: 1 }"
        :src="theLearning.url"
      ></video-embed>
    </div>
    <div class="w-1/5 px-4 pt-4">
      <h1 class="mb-2 text-2xl font-medium">
        {{ theLearning.title }}
      </h1>
      <div class="flex flex-row justify-between">
        <div
          class="flex flex-row justify-between w-1/3 px-6 py-4 mr-1 text-center bg-gray-400 rounded"
        >
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            class="w-6 h-6 eye"
            style="--darkreader-inline-fill: currentColor"
            data-darkreader-inline-fill=""
          >
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
            <path
              fill-rule="evenodd"
              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <p class="text-base text-gray-700">
            {{ theLearning.views }}
          </p>
        </div>
        <div
          class="flex flex-row justify-between w-1/3 px-6 py-4 bg-gray-400 rounded"
        >
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            class="w-6 h-6 thumb-up"
            style="--darkreader-inline-fill: currentColor"
            data-darkreader-inline-fill=""
          >
            <path
              d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"
            ></path>
          </svg>
          <p class="text-base text-gray-700">12</p>
        </div>
        <div
          class="flex flex-row justify-between w-1/3 px-6 py-4 ml-1 bg-gray-400 rounded"
        >
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            class="w-6 h-6 chat-alt"
            style="--darkreader-inline-fill: currentColor"
            data-darkreader-inline-fill=""
          >
            <path
              fill-rule="evenodd"
              d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <p class="text-base text-gray-700">1</p>
        </div>
      </div>
      <p class="py-4 text-base text-gray-700">
        {{ theLearning.description }}
      </p>
      <pre> // TODO Add #TAGS </pre>
      <span class="text-sm text-grey"
        >CreatedAt {{ theLearning.createdAt | formatDate }}</span
      >
      <span class="text-sm text-grey">
        AddedBy User {{ theLearning.userId }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Full-Learning-Card",
  component: {},
  computed: {
    viewHeight() {
      const headerHeight = document.getElementById("top").clientHeight;
      return `${headerHeight * 1.5}px`;
    },
    styleHeight() {
      return {
        "--header-height": this.viewHeight,
      };
    },
  },
  data() {
    return {
      theLearning: {},
      url: "https://www.youtube.com/watch?v=HOUjTyOWQ7U",
    };
  },
  mounted() {
    //get actaual chatroomid
    this.$http.get(`learning/show/${this.$route.params.id}`).then(
      (response) => {
        // connect to room
        this.theLearning = response.data;
      },
      (error) => {
        this.$notify({
          title: "Ooops...",
          text:
            (error.response && error.response.data) ||
            error.message ||
            error.toString(),
          group: "error",
        });
      }
    );
  },
};
</script>
