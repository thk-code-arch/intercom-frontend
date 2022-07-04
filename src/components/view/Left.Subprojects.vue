<!-- // Copyright (c) 2021 Steffen Stein <mail@steffenstein.com> For LICENSE see docs/LICENSE -->

<template>
  <div class="flex flex-col flex-1 overflow-hidden bg-white">
    <!-- Top bar -->
    <div class="flex items-center flex-none px-6 py-2 border-b">
      <div class="flex flex-col w-full">
        <div class="flex flex-row items-center justify-between space-x-1">
          <p class="mb-1 font-extrabold font-lg text-grey-darkest">
            Subprojects
          </p>
          <button
            class="flex flex-col px-3 py-1 text-white bg-gray-800 rounded-lg"
            @click="pushSpPositions"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
              />
            </svg>
          </button>
          <button
            class="flex flex-col px-3 py-1 text-white bg-gray-800 rounded-lg"
            @click="toggleModal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </button>
          <SavedSubprojectsModal
            @toggleSavedSubprojectsModal="toggleModal()"
            v-if="SavedSubprojectsModalIsOpen"
          />
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
import SavedSubprojectsModal from './utils/SavedSubprojectsModal';
export default {
  name: 'left-subprojects',
  data() {
    return {
      SavedSubprojectsModalIsOpen: false,
    };
  },
  components: {
    SubprojectPositionModal,
    SubprojectRotationModal,
    SavedSubprojectsModal,
  },
  computed: {
    isSubproject() {
      return !this.$store.state.curproject.theproject.subprojects;
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
    toggleModal() {
      this.SavedSubprojectsModalIsOpen = !this.SavedSubprojectsModalIsOpen;
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
