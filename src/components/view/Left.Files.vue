<template>
  <div class="flex flex-col flex-1 overflow-hidden bg-white">
    <!-- Top bar -->
    <div class="flex items-center justify-between flex-none px-6 py-2 border-b">
      <div class="flex flex-col">
        <h3 class="mb-1 font-extrabold text-grey-darkest">Files</h3>
        <div class="text-sm truncate text-grey-dark">Files</div>
      </div>
      <label
        class="flex flex-col inline-block px-3 py-1 mb-2 mr-2 font-semibold text-white bg-gray-800 rounded-full"
      >
        <input type="file" ref="file" @change="selectFile" hidden />
        + Upload
      </label>
    </div>
    <!-- TEXT -->
    <div class="flex items-start mb-4 text-sm">
      <div class="flex-1 px-6">
        <p class="leading-normal text-black">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et eagg
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import projectHeader from "../../services/project-header";
export default {
  name: "left-learning",
  data() {
    return {};
  },
  methods: {
    selectFile() {
      this.selectedFiles = this.$refs.file.files;
      this.upload();
    },
    upload() {
      const fd = new FormData();
      fd.append("file", this.selectedFiles.item(0));
      fd.append("projectId", projectHeader());
      this.$http.post("storage/upload_project_file", fd).then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};
</script>
