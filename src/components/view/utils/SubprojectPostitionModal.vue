<template>
  <div class="w-full flex flex-row">
    <div class="w-full flex-row flex items-center justify-between text-xs">
      <div class="flex-row flex w-1/3 bg-gray-100">
        <span class="w-1/4 font-bold">X:</span>
        <input value="1" type="number" class="w-3/4 bg-gray-100" />
      </div>
      <div class="flex-row flex w-1/3 bg-gray-100">
        <span class="w-1/4 font-bold">Y:</span>
        <input value="1" type="number" class="w-3/4 bg-gray-100" />
      </div>
      <div class="flex-row flex w-1/3 bg-gray-100">
        <span class="w-1/4 font-bold">Z:</span>
        <input value="1" type="number" class="w-3/4 bg-gray-100" />
      </div>
    </div>
    <div class="flex-row flex">
      <button class="p-1 font-semibold text-gray-800 bg-gray-300 rounded-lg">
        OK
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SubprojectPositionModal',
  props: { id: Number },
  data() {
    return { newPostition: { position: { x: 0, y: 0, z: 0 } } };
  },

  mounted() {
    this.newPostition = this.getPostition;
  },
  computed: {
    getPostition() {
      // return this.$store.getters[('viewport/subprojectPosition', this.id)];
      return { position: { x: 1, y: 2, z: 3 } };
    },
  },
};
</script>
