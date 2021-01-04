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
    <UploadIFC />
  </div>
</template>

<script>
import UploadIFC from "./UploadIFC";
import projectHeader from "@/services/project-header";
export default {
  name: "edit-project",
  data: function () {
    return {
      projectinfo: [],
      projects: [],
    };
  },
  components: {
    UploadIFC,
  },
  mounted() {
    this.$http.get("/project/get_projectinfo/" + projectHeader()).then(
      (response) => {
        this.projectinfo = response.data;
      },
      (error) => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
    this.$http.get("/project/get_projects").then(
      (response) => {
        this.projects = response.data;
      },
      (error) => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  },
};
</script>
