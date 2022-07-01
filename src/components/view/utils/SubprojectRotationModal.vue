<template>
  <div class="w-full flex flex-row">
    <div class="w-full flex-row flex items-center justify-between text-xs">
      <div class="flex-row flex w-1/3 bg-gray-100">
        <span class="w-1/4 font-bold">X:</span>
        <input
          :value="newRotation.rotation.x"
          @input="(event) => (newRotation.rotation.x = event.target.value)"
          type="number"
          class="w-3/4 bg-gray-100"
        />
      </div>
      <div class="flex-row flex w-1/3 bg-gray-100">
        <span class="w-1/4 font-bold">Y:</span>
        <input
          :value="newRotation.rotation.y"
          @input="(event) => (newRotation.rotation.y = event.target.value)"
          type="number"
          class="w-3/4 bg-gray-100"
        />
      </div>
      <div class="flex-row flex w-1/3 bg-gray-100">
        <span class="w-1/4 font-bold">Z:</span>
        <input
          :value="newRotation.rotation.z"
          @input="(event) => (newRotation.rotation.z = event.target.value)"
          type="number"
          class="w-3/4 bg-gray-100"
        />
      </div>
    </div>
    <div class="flex-row flex">
      <button
        class="p-1 font-semibold text-gray-800 bg-gray-300 rounded-lg"
        @click="setNewRotation()"
      >
        OK
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SubprojectRotationModal',
  props: { id: Number },
  computed: {
    newRotation: {
      get: function () {
        return this.$store.getters['viewport/subprojectPosition'](this.id);
      },
    },
  },
  methods: {
    setNewRotation() {
      return this.$store.dispatch(
        'viewport/setSuprojectPosition',
        this.newRotation
      );
    },
  },
};
</script>
