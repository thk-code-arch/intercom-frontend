<template>
  <div class="w-full flex flex-row">
    <div class="w-full flex-row flex items-center justify-between text-xs">
      <div class="flex-row flex w-full bg-gray-100">
        <span class="w-1/2 font-bold">Rotation Y:</span>

        <input
          :value="newRotation.rotation.y"
          @input="(event) => (newRotation.rotation.y = event.target.value)"
          type="number"
          class="w-1/2 bg-gray-100"
        />
      </div>
    </div>
    <div class="flex-row flex">
      <button
        class="p-1 font-semibold text-gray-800 bg-gray-300 rounded-lg"
        @click="resetRotation()"
      >
        RESET
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
    resetRotation() {
      this.newRotation.position.x = 0;
      this.newRotation.position.y = 0;
      this.newRotation.position.z = 0;
      this.newRotation.rotation.x = 0;
      this.newRotation.rotation.y = 0;
      this.newRotation.rotation.z = 0;
      return this.$store.dispatch(
        'viewport/setSuprojectPosition',
        this.newRotation
      );
    },
  },
};
</script>
