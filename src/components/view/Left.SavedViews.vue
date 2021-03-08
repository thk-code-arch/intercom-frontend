<template>
  <div class="flex flex-col flex-1 overflow-hidden bg-white">
    <!-- Top bar -->
    <div class="flex items-center flex-none px-6 py-2 border-b">
      <div class="flex flex-col">
        <h3 class="mb-1 font-extrabold text-grey-darkest">Saved Views</h3>
        <div class="text-sm truncate text-grey-dark">Saved Views</div>
      </div>
    </div>
    <!-- TEXT -->
    <div class="flex items-start mb-4 text-sm">
      <div class="flex-1 px-6">
        <p class="leading-normal text-black"></p>
        <ScreenshotFullScreen />
      </div>
    </div>
  </div>
</template>

<script>
import ScreenshotFullScreen from "./utils/ScreenshotFullScreen";
export default {
  name: "left-savedviews",
  data() {
    return {
      image: "",
    };
  },
  computed: {
    screenshotTaken() {
      return this.$store.state.viewport.takeScreenshot;
    },
  },
  components: {
    ScreenshotFullScreen,
  },
  methods: {
    takeScreenshot() {
      this.$store.dispatch("viewport/takeScreenshot");
    },
  },
};
</script>
