<template>
  <div>
    <div class="flex flex-wrap justify-center w-full">
      <div
        class="flex flex-col justify-center w-1/4 h-32 m-2 text-center bg-white rounded cursor-pointer"
        v-for="project in projects"
        :key="project.id"
        v-on:click="Select(project)"
      >
        <span class="text-2xl text-gray-700"> {{ project.name }} </span>
        <span class="text-xs text-gray-700"> {{ project.description }} </span>
      </div>
      <router-link
        to="/new-project"
        class="w-1/4 h-32 m-2 bg-white rounded cursor-pointer"
        v-if="showaddProject"
      >
        <svg
          class="inline-block w-full h-full p-12 text-gray-700 fill-current"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </router-link>
    </div>
  </div>
</template>

<script>
import Project from "@/models/project";

export default {
  name: "select-project",
  data: function () {
    return {
      project: new Project("", ""),
      selectedProject: "",
      projects: [],
      subprojects: [],
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showaddProject() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes("admin");
      }
      return false;
    },
  },
  methods: {
    addProject() {
      this.$store.dispatch("curproject/addnewProject").then(
        () => {
          this.$router.push("/new-project");
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    },
    Select: function (project) {
      if (project.sub === undefined || project.sub.length === 0) {
        this.project.id = project.id;
        this.$store.dispatch("curproject/selectProject", this.project).then(
          () => {
            this.$router.push("/view");
          },
          (error) => {
            this.loading = false;
            this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
          }
        );
      }
      if (project.sub.length !== 0) {
        console.log("has subs");
        this.projects = this.subprojects.filter(
          (p) => p.parentProject === project.id
        );
        project.sub = [];
        this.projects.unshift(project);
      }
    },
  },
  mounted() {
    this.$http.get("project/get_projects").then(
      (response) => {
        this.projects = response.data.filter((p) => p.parentProject === null);
        this.subprojects = response.data.filter(
          (p) => p.parentProject !== null
        );
        for (var i = 0; i < this.projects.length; i++) {
          this.projects[i]["sub"] = [];
          const found = this.subprojects.find(
            (sp) => sp["parentProject"] === this.projects[i].id
          );
          if (found) {
            this.projects[i]["sub"].push(found.id);
          }
        }
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
