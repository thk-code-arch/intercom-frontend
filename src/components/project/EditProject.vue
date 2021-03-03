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
      <FormulateForm
        @submit="submitNewProject"
        v-model="newProject"
        :schema="newProjectSchema"
      />
      <UploadIFC v-if="currentState.state == 'project-settings'" />
    </div>
  </div>
</template>

<script>
import UploadIFC from "./UploadIFC";
import projectHeader from "@/services/project-header";
export default {
  name: "edit-project",
  data: function () {
    return {
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
      newProject: {},
      newProjectSchema: [
        {
          label: "Project name",
          name: "name",
          validation: "required",
        },
        {
          label: "Project description",
          name: "description",
          validation: "required",
        },
        {
          type: "select",
          label: "Optional: Select parent project",
          name: "parentprojectid",
          placeholder: "Parent project",
          options: {},
        },
        {
          type: "submit",
          label: "Save project",
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

  methods: {
    submitNewProject() {
      this.$http.post("/project/add_project", this.newProject).then(
        (response) => {
          this.$store
            .dispatch("curproject/selectProject", response.data)
            .then(() => {
              this.$router.push("/project-settings");
            });
        },
        (error) => {
          this.content =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    },
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
        this.newProjectSchema[2].options = response.data.map(
          ({ id, name }) => ({
            label: name,
            value: id,
          })
        );
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
