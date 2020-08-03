<template>
  <div class="p-8">
    <FormulateInput
      type="text"
      label="Project Name"
      name="projectinfo.name"
      v-model="projectinfo.name"
    />
    <FormulateInput
      type="text"
      label="Project Description"
      name="projectinfo.description"
      v-model="projectinfo.description"
    />
    <FormulateInput
      type="select"
      label="Parent Project"
      name="projectinfo.description"
      :options="projects"
    />
      <upload-files></upload-files>
  </div>
</template>

<script>
import UploadFiles from "./UploadFiles";
import ProjectService from "../services/project.service";
export default {
  name: 'edit-project',
  data: function() {
    return {
      projectinfo: [],
      projects: [],
    }
  },
  components: {
      UploadFiles
  },
  mounted() {
      ProjectService.getProjectinfo().then(
      response => {
        this.projectinfo = response.data;
      },
      error => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
      ProjectService.getProjects().then(
      response => {
        this.projects = response.data;
      },
      error => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  }
};
</script>
