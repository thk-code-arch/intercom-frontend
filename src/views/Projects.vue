<template>
  <div class="w-full px-4 px-6 mx-auto sm:px-8">
    <div class="py-8">
      <div>
        <h2 class="text-2xl font-semibold leading-tight">Projects</h2>
      </div>
      <!-- TEXT -->
      <select-project />
    </div>
  </div>
</template>
<script>
import SelectProject from "../components/project/SelectProject";
export default {
  name: "projects",
  components: {
    SelectProject,
  },
  methods: {},
};
</script>
