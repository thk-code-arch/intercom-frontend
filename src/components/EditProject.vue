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
    <UploadIFC/>
  </div>
</template>

<script>
import UploadIFC from "./project/UploadIFC";
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
      UploadIFC
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
