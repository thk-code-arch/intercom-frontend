<!-- // Copyright (c) 2021 Steffen Stein <mail@steffenstein.com> For LICENSE see docs/LICENSE -->

<template>
  <div class="px-4">
    <div class="max-w-6xl p-8 mx-auto my-8 bg-white rounded-lg">
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
