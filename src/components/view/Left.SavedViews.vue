<!-- // Copyright (c) 2021 Steffen Stein <mail@steffenstein.com> For LICENSE see docs/LICENSE -->

<template>
  <div class="bottom-0 flex flex-col flex-1 overflow-hidden bg-white">
    <!-- Top bar -->
    <div class="flex items-center justify-between flex-none px-6 py-2 border-b">
      <div class="flex flex-col">
        <h3 class="mb-1 font-extrabold text-grey-darkest">Screenshot</h3>
        <div class="text-sm truncate text-grey-dark">List</div>
      </div>
      <button
        class="flex flex-col inline-block px-3 py-1 mb-2 mr-2 font-semibold text-white bg-gray-800 rounded-lg"
        v-on:click="takeScreenshot()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
      <ScreenshotModal
        @toggleScreenshotModal="toggleScreenshotModal()"
        @getScreenshots="getScreenshots()"
        v-if="ScreenshotModalIsOpen"
      />
    </div>
    <!-- TEXT -->
    <div class="flex items-start h-full mb-4 overflow-y-scroll text-sm">
      <div class="flex-1 px-6">
        <div
          class=""
          v-for="(screenshot, screnshot_idx) in screenshots"
          :key="screnshot_idx"
        >
          <Screenshot-Card v-bind:screenshot="screenshot" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ScreenshotModal from './utils/ScreenshotModal';
import ScreenshotCard from './utils/ScreenshotCard';
import projectHeader from '../../services/project-header';
export default {
  name: 'left-savedviews',
  data() {
    return {
      image: '',
      ScreenshotModalIsOpen: false,
      screenshots: [],
    };
  },
  computed: {},
  components: {
    ScreenshotModal,
    ScreenshotCard,
  },
  mounted() {
    this.getScreenshots();
  },
  methods: {
    takeScreenshot() {
      this.$store.dispatch('viewport/takeScreenshot');
      this.ScreenshotModalIsOpen = true;
    },
    toggleScreenshotModal() {
      this.ScreenshotModalIsOpen = !this.ScreenshotModalIsOpen;
    },
    getScreenshots() {
      this.$http.get(`storage/get_project_screenshot/${projectHeader()}`).then(
        (response) => {
          this.screenshots = response.data;
        },
        (error) => {
          this.content =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
};
</script>
