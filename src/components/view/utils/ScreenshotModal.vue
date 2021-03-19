<template>
  <div>
    <div
      class="fixed top-0 left-0 flex items-center justify-center w-full h-full z-60 modal"
      ref="modal"
    >
      <div
        class="absolute w-full h-full bg-gray-900 opacity-50 modal-overlay"
      ></div>
      <div class="p-12">
        <!--content-->
        <div
          class="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none"
        >
          <!--header-->
          <div
            class="flex items-start justify-between p-2 border-b border-gray-300 border-solid rounded-t"
          >
            <p class="text-2xl font-bold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="inline-block w-4 h-4 text-black fill-current"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Screenshot
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
          <div class="relative flex-auto p-2" ref="sketch">
            <Editor
              :canvasWidth="size.width"
              :canvasHeight="size.height"
              ref="editor"
              editorId="canvasId"
              class="bg-red-100"
            />

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
  </div>
</template>


<script>
import Editor from "vue-image-markup";

export default {
  name: "ScreenshotModal",

  data() {
    return {
      showModal: false,
    };
  },
  components: { Editor },

  computed: {
    screenshotDataUrl() {
      return this.$store.state.viewport.imgDataurl;
    },
    size() {
      console.log(this.$store.state.viewport.imgDataurl);

      const size = new Object();
      size.height = "600";
      size.width = "1200";
      // TODO SET Sketch Editor size based on screen Size
      return size;
    },
  },
  mounted() {
    this.$refs.editor.setBackgroundImage(this.$store.state.viewport.imgDataurl);
    this.$refs.editor.set(this.editor.mode, this.editor.options);
    let circleModeParams = { fill: "blue", stroke: "white" };
    this.$refs.editor.set("circle", circleModeParams);
  },
  updated() {},
  methods: {
    toggleModal() {
      this.$emit("toggleScreenshotModal");
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
