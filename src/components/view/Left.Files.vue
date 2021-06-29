<!-- // Copyright (c) 2021 Steffen Stein <mail@steffenstein.com> For LICENSE see docs/LICENSE -->

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
    <div class="flex items-start h-full mb-4 overflow-y-scroll text-sm">
      <div class="flex-1 px-6">
        <div
          class=""
          v-for="(listFile, listFile_idx) in pfiles"
          :key="listFile_idx"
        >
          <a :href="$files_url + listFile.filepath" target="_blank">
            {{ listFile.description }}
          </a>
        </div>
      </div>
      <!-- TEXT -->
    </div>
  </div>
</template>

<script>
import projectHeader from "../../services/project-header";
export default {
  name: "left-learning",
  data() {
    return {
      pfiles: [],
    };
  },
  mounted() {
    this.getFiles();
  },
  methods: {
    getFiles() {
      this.$http.get(`storage/get_project_file/${projectHeader()}`).then(
        (response) => {
          this.pfiles = response.data;
        },
        (error) => {
          this.content =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    },
    selectFile() {
      this.selectedFiles = this.$refs.file.files;
      this.upload();
    },
    upload() {
      const fd = new FormData();
      fd.append("file", this.selectedFiles.item(0));
      fd.append("projectId", projectHeader());
      this.$http.post("storage/upload_project_file", fd).then(
        () => {
          this.getFiles();
          this.$notify({
            title: "Success",
            text: "File uploaded",
            group: "info",
          });
        },
        (error) => {
          this.$notify({
            title: "Ooops...",
            text:
              (error.response && error.response.data) ||
              error.message ||
              error.toString(),
            group: "error",
          });
        }
      );
    },
  },
};
</script>
