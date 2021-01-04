<template>
  <div class="px-4">
    <div class="max-w-6xl p-8 mx-auto my-8 bg-white rounded-lg">
      <!-- Top bar -->
      <div class="border-b flex px-6 py-2 mb-4 items-center flex-none">
        <div class="flex flex-col">
          <h1 class="text-2xl font-medium mb-2">Edit</h1>
          <div class="text-sm truncate text-grey-dark">Project Settings</div>
        </div>
      </div>
      <!-- TEXT -->
      <edit-project />
    </div>
  </div>
</template>

<script>
import EditProject from "../components/project/EditProject";
export default {
  name: "Project-Settings",
  components: {
    EditProject,
  },
  data() {
    return {
      file: "",
    };
  },
};
</script>
