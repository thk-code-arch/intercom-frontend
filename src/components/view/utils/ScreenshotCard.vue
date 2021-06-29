<!-- // Copyright (c) 2021 Steffen Stein <mail@steffenstein.com> For LICENSE see docs/LICENSE -->

<template>
  <div
    v-on:click="toggleFullscreenImageModal()"
    class="flex flex-row rounded-sm border-gray-200 border m-2 justify-between cursor-pointer"
  >
    <div class="px-6 py-4">
      <img
        class="w-16 h-16"
        alt="Screenshot Preview"
        :src="$files_url + screenshot.thumbnail"
      />
    </div>
    <div class="px-6 py-4 flex flex-col justify-center">
      <div class="mb-2 text-xl font-bold">{{ screenshot.title }}</div>
      <p class="text-sm text-gray-700">
        {{ screenshot.description }}
      </p>
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
