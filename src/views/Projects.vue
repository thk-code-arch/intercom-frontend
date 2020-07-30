<template>
  <div class="px-4">
    <div class="max-w-3xl bg-white rounded-lg mx-auto my-16 p-16">
      <h1 class="text-2xl font-medium mb-2">Projects</h1>
    <select-project/>
  </div>
  </div>
</template>
<script>
import SelectProject from "../components/SelectProject";
export default {
  name: 'projects',
  components: {
      SelectProject
  },
  methods: {
      }
};
</script>
