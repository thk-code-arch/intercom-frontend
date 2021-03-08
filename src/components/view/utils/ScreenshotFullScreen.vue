<template>
  <div>
    <button
      class="w-full px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase rounded shadow outline-none bg-codearch-500 active:bg-codearch-600 focus:outline-none"
      type="button"
      style="transition: all 0.15s ease"
      v-on:click="toggleModal()"
    >
      Screenshot
    </button>
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
    >
      <div class="relative w-auto max-w-full px-12 mx-auto">
        <!--content-->
        <div
          class="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none"
        >
          <!--header-->
          <div
            class="flex items-start justify-between p-2 border-b border-gray-300 border-solid rounded-t"
          >
            <button
              class="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none opacity-5 focus:outline-none"
              v-on:click="toggleModal()"
            >
              <span
                class="block w-6 h-6 text-2xl text-black bg-transparent outline-none opacity-5 focus:outline-none"
              >
                ×
              </span>
            </button>
          </div>
          <!--body-->
          <div class="relative flex-auto p-2">
            <img :src="screenshotDataUrl" />
            <p class="my-4 text-lg leading-relaxed text-gray-600"></p>
          </div>
          <!--footer-->
          <div
            class="flex items-center justify-end p-6 border-t border-gray-300 border-solid rounded-b"
          >
            <button
              class="px-4 py-2 mb-1 mr-1 text-sm font-bold uppercase outline-none text-codearch-400 background-transparent focus:outline-none"
              type="button"
              style="transition: all 0.15s ease"
              v-on:click="toggleModal()"
            >
              Close
            </button>
            <button
              class="px-4 py-2 mb-1 mr-1 text-sm font-bold uppercase bg-transparent border border-solid rounded outline-none text-codearch-400 border-codearch-400 hover:bg-codearch-400 hover:text-white active:bg-red-600 focus:outline-none"
              type="button"
              style="transition: all 0.15s ease"
              v-on:click="toggleModal()"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="fixed inset-0 z-40 bg-black opacity-50"></div>
  </div>
</template>


<script>
export default {
  name: "ScreenshotFullScreen",

  data() {
    return {
      showModal: false,
    };
  },

  computed: {
    screenshotDataUrl() {
      return this.$store.state.viewport.imgDataurl;
    },
  },
  methods: {
    toggleModal() {
      this.takeScreenshot();
      this.showModal = !this.showModal;
    },
    takeScreenshot() {
      this.$store.dispatch("viewport/takeScreenshot");
    },
  },
};
</script>
