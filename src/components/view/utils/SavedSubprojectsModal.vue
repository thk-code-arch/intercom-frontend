<template>
  <div>
    <div
      class="fixed top-0 left-0 flex justify-center items-center w-full h-full z-60 modal"
      ref="modal"
    >
      <div
        class="absolute w-full h-full bg-gray-900 opacity-50 modal-overlay"
      ></div>
      <div class="">
        <!--content-->
        <div
          class="relative flex flex-col w-full bg-white rounded-lg shadow-lg outline-none focus:outline-none"
        >
          <!--header-->
          <div
            class="flex items-start justify-between p-2 border-b border-gray-300 border-solid rounded-t"
          >
            <p class="flex-row flex text-2xl items-center font-bold">
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
              Subprojects position history
            </p>
            <button
              class="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none opacity-5 focus:outline-none"
              v-on:click="toggleModal()"
            >
              <svg
                class="text-black fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path
                  d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
                ></path>
              </svg>
            </button>
          </div>
          <!--body-->
          <div class="flex flex-col overflow-y-scroll h-64">
            <div v-for="(ssP, ssP_idx) in savedSubprojects" :key="ssP_idx">
              <div
                class="flex p-2 m-2 flex-col border-gray-400 border rounded-sm cursor-pointer"
                @click="setSelectedSubprojects(ssP.selectedSubprojects)"
              >
                <p class="text-normal leading-relaxed text-gray-800">
                  Saved: {{ ssP.createdAt | formatDate }}
                </p>
              </div>
              <p class="text-normal leading-relaxed text-gray-800"></p>
            </div>
            <p class="my-4 text-lg leading-relaxed text-gray-600"></p>
          </div>
          <!--footer-->
          <div
            class="flex items-center justify-between p-6 border-t border-gray-300 border-solid rounded-b"
          >
            footer
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SavedSubprojectsModal',
  data() {
    return {
      showModal: false,
      savedSubprojects: [],
    };
  },
  components: {},
  computed: {},
  mounted() {
    this.getManySelectedSubprojects();
  },
  methods: {
    toggleModal() {
      this.$emit('toggleSavedSubprojectsModal');
    },
    setSelectedSubprojects(ssp) {
      console.log('click');
      this.$emit('toggleSavedSubprojectsModal');
      this.$store.dispatch('viewport/pullSubprojectPositions', ssp);
    },
    getManySelectedSubprojects() {
      this.$http
        .get(
          `/view/get_manyselectedsubprojects/${this.$store.state.curproject.theproject.id}`
        )
        .then(
          (response) => {
            this.savedSubprojects = response.data;
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
<style>
.navbar.vue-fixed-header--isFixed {
  position: fixed;
  left: 0;
  top: 0;
}
.modal {
  transition: opacity 0.25s ease;
}
body.modal-active {
  overflow-x: hidden;
  overflow-y: visible !important;
}
</style>
