<!-- // Copyright (c) 2021 Steffen Stein <mail@steffenstein.com> For LICENSE see docs/LICENSE -->

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
            class="flex items-center justify-between p-6 border-t border-gray-300 border-solid rounded-b"
          >
            <div class="flex flex-row">
              <div
                class="w-8 h-8 m-2 cursor-pointer"
                v-on:click="setTool('selectMode')"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="text-red-800 bg-red-200 rounded"
                  v-bind:class="{
                    'border-red-500 border':
                      currentActiveMethod === 'selectMode',
                  }"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="{2}"
                    d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
                  />
                </svg>
              </div>
              <div
                class="w-8 h-8 m-2 cursor-pointer"
                v-on:click="setTool('text', text)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="text-red-800 bg-red-200 rounded"
                  v-bind:class="{
                    'border-red-500 border': currentActiveMethod === 'text',
                  }"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
              </div>
              <div
                class="w-8 h-8 m-2 cursor-pointer"
                v-on:click="setTool('freeDrawing', pen)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  class="text-red-800 bg-red-200 rounded"
                  v-bind:class="{
                    'border-red-500 border':
                      currentActiveMethod === 'freeDrawing',
                  }"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </div>
            </div>
            <FormulateForm @submit="uploadImage" class="flex flex-row">
              <FormulateInput
                type="text"
                name="description"
                v-model="description"
                placeholder="Set description"
                validation="required"
                class="p-4"
              />
              <FormulateInput label="Save" type="submit" class="p-4" />
            </FormulateForm>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Editor from "vue-image-markup";
import projectHeader from "../../../services/project-header";

export default {
  name: "ScreenshotModal",

  data() {
    return {
      showModal: false,
      currentActiveMethod: "selectMode",
      description: "",
      text: {
        fontFamily: "Verdana",
        fill: "red",
      },
      pen: {
        stroke: "red",
        strokeWidth: 2,
      },
    };
  },
  components: { Editor },

  computed: {
    screenshotDataUrl() {
      return this.$store.state.viewport.imgDataurl;
    },
    size() {
      const size = new Object();
      size.height = "600";
      size.width = "1200";
      // TODO SET Sketch Editor size based on screen Size
      return size;
    },
  },
  mounted() {
    this.$refs.editor.setBackgroundImage(this.$store.state.viewport.imgDataurl);
  },
  methods: {
    setTool(type, toolOptions) {
      this.currentActiveMethod = type;
      this.$refs.editor.set(type, toolOptions);
    },
    broadcastImageInChat(thumbnail, description) {
      const message = `![SavedView](${
        this.$files_url + thumbnail
      } "${description}")`;
      this.$store.dispatch("chatroom/CHAT_sendmessage", message);
    },
    toggleModal() {
      this.$emit("toggleScreenshotModal");
      this.$emit("getScreenshots");
    },
    async uploadImage() {
      const base64 = await this.$refs.editor.saveImage();
      return fetch(base64)
        .then((res) => res.blob())
        .then((blob) => {
          const fd = new FormData();
          var today = new Date();
          var date =
            today.getFullYear() +
            "-" +
            (today.getMonth() + 1) +
            "-" +
            today.getDate();
          var time =
            today.getHours() +
            "-" +
            today.getMinutes() +
            "-" +
            today.getSeconds();
          const file = new File([blob], `${date}-${time}.png`);
          fd.append("file", file);
          fd.append("description", this.description);
          fd.append("projectId", projectHeader());
          this.$http.post("storage/upload_project_screenshot", fd).then(
            (response) => {
              this.broadcastImageInChat(
                response.data.thumbnail,
                response.data.description
              );
              this.toggleModal();
            },
            (error) => {
              this.content = error;
            }
          );
        });
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
