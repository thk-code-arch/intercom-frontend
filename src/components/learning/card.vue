<!-- // Copyright (c) 2021 Steffen Stein <mail@steffenstein.com> For LICENSE see docs/LICENSE -->

<template>
  <div
    v-on:click="showFull()"
    class="max-w-sm overflow-hidden bg-white rounded cursor-pointer"
  >
    <img class="" :src="$files_url + theLearning.thumbnail" />
    <div class="px-6 py-4">
      <div class="mb-2 text-xl font-bold">{{ theLearning.title }}</div>
      <p class="text-base text-gray-700">
        {{ theLearning.description }}
      </p>
    </div>
    <div class="px-6 pt-4 pb-2">
      <span
        class="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full"
        >{{ theLearning.category }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Learning-Card",
  props: {
    theLearning: Object,
  },
  methods: {
    showFull() {
      this.$router.push("/learning/show/" + this.theLearning.id);
    },
  },
  data() {
    return {
      url: "https://www.youtube.com/watch?v=HOUjTyOWQ7U",
    };
  },
};
</script>
