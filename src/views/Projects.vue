<!-- // Copyright (c) 2021 Steffen Stein <mail@steffenstein.com> For LICENSE see docs/LICENSE -->

<template>
  <div class="w-full px-4 px-6 mx-auto sm:px-8">
    <div class="py-8">
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
