<template>
  <div class="flex flex-col flex-1 overflow-hidden bg-white">
    <!-- Top bar -->
    <div class="flex items-center justify-between flex-none px-6 py-2 border-b">
      <div class="flex flex-col">
        <h3 class="mb-1 font-extrabold text-grey-darkest">Saved Views</h3>
        <div class="text-sm truncate text-grey-dark">List</div>
      </div>
      <button
        class="flex flex-col inline-block px-3 py-1 mb-2 mr-2 font-semibold text-white bg-gray-800 rounded-full"
        v-on:click="takeScreenshot()"
      >
        + Screenshot
      </button>
    </div>
    <!-- TEXT -->
    <div class="flex items-start mb-4 text-sm">
      <div class="flex-1 px-6">
        <p class="leading-normal text-black"></p>
        <ScreenshotModal
          @toggleScreenshotModal="toggleScreenshotModal()"
          @getScreenshots="getScreenshots()"
          v-if="ScreenshotModalIsOpen"
        />
      </div>
    </div>
    <div
      class=""
      v-for="(screenshot, screnshot_idx) in screenshots"
      :key="screnshot_idx"
    >
      <Screenshot-Card v-bind:screenshot="screenshot" />
    </div>
  </div>
</template>

<script>
import ScreenshotModal from "./utils/ScreenshotModal";
import ScreenshotCard from "./utils/ScreenshotCard";
import projectHeader from "../../services/project-header";
export default {
  name: "left-savedviews",
  data() {
    return {
      image: "",
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
      this.$store.dispatch("viewport/takeScreenshot");
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
          console.log(error);
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
