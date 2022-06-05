<!-- // Copyright (c) 2021 Steffen Stein <mail@steffenstein.com> For LICENSE see docs/LICENSE -->

<template>
  <div class="flex flex-col flex-1 overflow-hidden bg-white">
    <!-- Top bar -->
    <div class="flex items-center flex-none px-6 py-2 border-b">
      <div class="flex flex-col">
        <div class="flex flex-row w-full">
          <h3 class="mb-1 font-extrabold text-grey-darkest">Subprojects</h3>
          <button
            class="flex flex-col px-3 py-1 mb-2 mr-2 font-semibold text-white bg-gray-800 rounded-full"
          >
            + save
          </button>
        </div>
        <div class="text-sm truncate text-grey-dark">Load Subprojects</div>
      </div>
    </div>
    <!-- TEXT -->
    <div class="flex items-start mb-4 text-sm overflow-y-scroll">
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
              v-model="selectedSubproject"
            />
            <div class="flex flex-col w-full">
              <span class="ml-2 text-gray-700">{{ subProject.name }}</span>
              <span class="ml-2 text-gray-700">{{
                subProject.description
              }}</span>
            </div>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'left-subprojects',
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
        return this.$store.state.viewport.selectedSubprojects;
      },
      set(value) {
        console.log(value);
        const preSelected = this.$store.state.viewport.selectedSubprojects;
        const selectedProject = value.map((x) => {
          const foundPostion = preSelected.find((p) => p.id === x.id);
          return {
            ...x,
            position: foundPostion
              ? foundPostion.position
              : { x: '0', y: '0', z: '0' },
          };
        });

        return this.$store.commit(
          'viewport/selectedSubprojects',
          selectedProject
        );
      },
    },
  },
};
</script>
