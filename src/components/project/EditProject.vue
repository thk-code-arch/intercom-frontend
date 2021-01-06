<template>
  <div>
    <!-- Top bar -->
    <div class="flex items-center flex-none px-6 py-2 mb-4 border-b">
      <div class="flex flex-col">
        <h1 class="mb-2 text-2xl font-medium">{{ currentState.title }}</h1>
        <div class="text-sm truncate text-grey-dark">
          {{ currentState.subtitle }}
        </div>
      </div>
    </div>
    <div class="p-8">
      <!-- TEXT -->
      <FormulateForm :schema="schema" />
      <UploadIFC v-if="currentState.state == 'project-settings'" />
    </div>
  </div>
</template>

<script>
import UploadIFC from "./UploadIFC";
import projectHeader from "@/services/project-header";
import schema from "./project.schema";
export default {
  name: "edit-project",
  data: function () {
    return {
      schema,
      state: [
        {
          state: "new-project",
          title: "New Project",
          subtitle: "Add a new Project.",
        },
        {
          state: "project-settings",
          title: "Edit Project",
          subtitle: "Modify project settings",
        },
      ],
      projectinfo: [],
      projects: [],
    };
  },
  computed: {
    currentState: function () {
      return this.state.find((s) => s.state == this.$route.name);
    },
  },
  components: {
    UploadIFC,
  },
  mounted() {
    if (this.currentState.state !== "new-project") {
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
    }
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
