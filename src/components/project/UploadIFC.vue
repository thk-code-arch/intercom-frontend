<template>
  <div>
    <div v-if="currentFile" class="progress">
      <div
      >
        {{ progress }}%
      </div>
    </div>

    <label class="">
      <input type="file" ref="file" @change="selectFile" />
    </label>

    <button class="btn btn-blue" :disabled="!selectedFiles" @click="upload">
      Upload
    </button>

    <div v-if="message">
      <a :href="$app_url+message">Logfile</a>
    </div>
  </div>
</template>

<script>
import UploadService from "@/services/file.service";
export default {
  name: "UploadIFC",
  data() {
    return {
      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: '',
      fileInfos: []
    };
  },
  methods: {
    selectFile() {
      this.selectedFiles = this.$refs.file.files;
    },
    upload() {
      this.progress = 0;
      this.currentFile = this.selectedFiles.item(0);
      UploadService.uploadifc(this.currentFile, event => {
        this.progress = Math.round((100 * event.loaded) / event.total);
      })
        .then(response => {
          this.message = response.data.data.logfile;
        })
      this.selectedFiles = undefined;
    }
  },
  mounted() {
  }
};
</script>
