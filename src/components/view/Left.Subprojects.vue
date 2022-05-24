<!-- // Copyright (c) 2021 Steffen Stein <mail@steffenstein.com> For LICENSE see docs/LICENSE -->

<template>
  <div class="flex flex-col flex-1 overflow-hidden bg-white">
    <!-- Top bar -->
    <div class="flex items-center flex-none px-6 py-2 border-b">
      <div class="flex flex-col">
        <h3 class="mb-1 font-extrabold text-grey-darkest">Subprojects</h3>
        <div class="text-sm truncate text-grey-dark">Load Subprojects</div>
      </div>
    </div>
    <!-- TEXT -->
    <div class="flex items-start mb-4 text-sm">
      <div class="flex-1 px-6">
        <div class="flex flex-col">
          <label
            class="inline-flex items-center mt-3"
            v-for="(subProject, subProject_idx) in subprojects"
            :key="subProject_idx"
          >
            <input
              type="checkbox"
              class="form-checkbox h-5 w-5 text-gray-600"
              :value="subProject"
              v-model="testSubproject"
            /><span class="ml-2 text-gray-700">{{ subProject.name }}</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'left-subprojects',
  data() {
    return {
      testSubproject: [],
    };
  },
  computed: {
    isSubproject() {
      return !!this.$store.state.curproject.theproject.subprojects;
    },
    subprojects() {
      if (this.$store.state.curproject.theproject.subprojects !== null) {
        return this.$store.state.curproject.theproject.subprojects;
      }
      return null;
    },
    selectedSubproject: {
      get() {
        return null;
      },
      set() {
        return null;
      },
    },
  },
  methods: {
    selectSubproject(subproject) {
      this.$store.dispatch('viewport/selectSubproject', subproject);
    },
  },
};
</script>
