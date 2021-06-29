<!-- // Copyright (c) 2021 Steffen Stein <mail@steffenstein.com> For LICENSE see docs/LICENSE -->

<template>
  <div>
    <div v-if="currentFile" class="progress">
      <div>{{ progress }}%</div>
    </div>

    <label class="">
      <input type="file" ref="file" @change="selectFile" />
    </label>

    <button class="btn btn-blue" :disabled="!selectedFiles" @click="upload">
      Upload
    </button>

    <div class="h-64 overflow-y-scroll" v-if="message">
      {{ message }}
    </div>
  </div>
</template>

<script>
import projectHeader from "../../services/project-header";
export default {
  name: "UploadIFC",
  data() {
    return {
      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: "",
      fileInfos: [],
    };
  },
  methods: {
    selectFile() {
      this.selectedFiles = this.$refs.file.files;
    },
    upload() {
      // TODO Upload IFC: Uploading File process bar.
      const fd = new FormData();
      fd.append("file", this.selectedFiles.item(0));
      fd.append("projectId", projectHeader());
      this.message = "Uploading & processing. Please Wait.";
      this.selectedFiles = undefined;
      this.$http.post(`project/uploadifc/${projectHeader()}`, fd).then(
        (response) => {
          this.message = response.data.log;
          this.$notify({
            title: "Convert finished",
            text: "See logfile.",
            group: "info",
            duration: 7000,
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
  mounted() {},
};
</script>
