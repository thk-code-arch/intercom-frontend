<template>
  <div
    v-on:click="toggleFullscreenImageModal()"
    class="flex flex-row justify-between cursor-pointer"
  >
    <div class="px-6 py-4">
      <img class="w-16 h-16" :src="$app_url + screenshot.thumbnail" />
    </div>
    <div class="px-6 py-4 flex flex-col justify-between">
      <div class="mb-2 text-xl font-bold">{{ screenshot.title }}</div>
      <p class="text-base text-gray-700">
        {{ screenshot.description }}
      </p>
      <span
        class="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full"
        >{{ screenshot.user.username }}</span
      >
    </div>
    <FullscreenImage
      @toggleFullscreenImageModal="toggleFullscreenImageModal()"
      v-if="FullscreenImageModalIsOpen"
      v-bind:image="screenshot"
    />
  </div>
</template>

<script>
import FullscreenImage from "./FullscreenImage";
export default {
  name: "Screenshot-Card",
  props: {
    screenshot: Object,
  },
  components: {
    FullscreenImage,
  },
  methods: {
    toggleFullscreenImageModal() {
      this.FullscreenImageModalIsOpen = !this.FullscreenImageModalIsOpen;
    },
  },
  data() {
    return {
      FullscreenImageModalIsOpen: false,
    };
  },
};
</script>
