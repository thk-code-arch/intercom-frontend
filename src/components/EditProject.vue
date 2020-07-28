<template>
  <div class="container">
      <upload-files></upload-files>
  </div>
</template>

<script>
import UploadFiles from "./UploadFiles";
export default {
  name: 'edit-project',
  components: {
      UploadFiles
  },
};
</script>
