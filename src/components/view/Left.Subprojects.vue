<!-- // Copyright (c) 2021 Steffen Stein <mail@steffenstein.com> For LICENSE see docs/LICENSE -->

<template>
  <div class="flex flex-col flex-1 overflow-hidden bg-white">
    <!-- Top bar -->
    <div class="flex items-center flex-none px-6 py-2 border-b">
      <div class="flex flex-col w-full">
        <div class="flex justify-between">
          <h3 class="mb-1 font-extrabold text-grey-darkest">Subprojects</h3>
          <button
            class="flex flex-col px-3 py-1 mb-2 mr-2 font-semibold text-white bg-gray-800 rounded-full"
            @click="pushSpPositions"
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
          <div class="flex flex-row mt-2 justify-between">
            <button
              @click="unloadAllSubprojects"
              class="border border-red-500 rounded px-3 py-2 leading-none focus:border-red-500 bg-red-400 outline-none border-box mb-1"
            >
              Unload all
            </button>
            <button
              @click="reloadAllSubprojects"
              class="border border-gray-500 rounded px-3 py-2 leading-none focus:border-gray-500 bg-gray-400 outline-none border-box mb-1"
            >
              Reload all
            </button>
          </div>
          <div
            class="inline-flex items-center mt-3"
            v-for="(subProject, subProject_idx) in subprojects"
            :key="subProject_idx"
          >
            <input
              type="checkbox"
              class="form-checkbox h-5 w-5 text-gray-600"
              :value="subProject.id"
              v-model="selectedSubproject"
            />
            <div class="flex flex-col w-full">
              <span class="ml-2 text-gray-700 font-bold">{{
                subProject.name
              }}</span>
              <span class="ml-2 text-gray-700">{{
                subProject.description
              }}</span>
              <div
                v-if="selectedSubproject.includes(subProject.id)"
                class="ml-2"
              >
                <SubprojectPositionModal v-bind:id="subProject.id" />
                <SubprojectRotationModal v-bind:id="subProject.id" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SubprojectPositionModal from './utils/SubprojectPostitionModal';
import SubprojectRotationModal from './utils/SubprojectRotationModal';
export default {
  name: 'left-subprojects',
  components: { SubprojectPositionModal, SubprojectRotationModal },
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
        return this.$store.dispatch('viewport/set_subproject', value);
      },
    },
  },
  mounted() {
    this.reloadAllSubprojects();
  },
  methods: {
    unloadAllSubprojects() {
      return this.$store.commit('viewport/unloadSubprojects');
    },
    hello(id) {
      console.log(id);
    },
    pushSpPositions() {
      this.$http
        .post('/view/set_selectedsubprojects', {
          selectedSubprojects: this.$store.state.viewport.subprojectsPositions,
          projectId: this.$store.state.curproject.theproject.id,
        })
        .then(
          (response) => {
            this.$notify({
              title: 'Success',
              text: `View saved ${response.data?.selectedSubprojects.length} Model`,
              group: 'info',
            });
          },
          (error) => {
            this.$notify({
              title: 'Ooops...',
              text:
                (error.response && error.response.data) ||
                error.message ||
                error.toString(),
              group: 'error',
            });
          }
        );
    },
    reloadAllSubprojects() {
      this.$http
        .get(
          `/view/get_selectedsubprojects/${this.$store.state.curproject.theproject.id}`
        )
        .then(
          (response) => {
            console.log('pullSpPositions', response.data.selectedSubprojects);
            if (response.data.selectedSubprojects.length > 0) {
              console.log(
                'pulllength',
                response.data.selectedSubprojects.length
              );
              return this.$store.dispatch(
                'viewport/pullSubprojectPositions',
                response.data.selectedSubprojects
              );
            }
          },
          (error) => {
            this.content =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
          }
        );
    },
  },
};
</script>
