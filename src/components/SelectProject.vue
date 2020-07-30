<template>
  <div>
    <strong>Select Project</strong>
     <p/>
    <select name="projectSelect" v-model="selectedProject" @change="SelectProject" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
      <option v-for="project in projects" :key="project.id" v-bind:value="project.id"> {{ project.name }} </option>
     </select>
     <p/>
     <div v-if="showaddProject">
    <strong>New Project</strong>
     <p/>
     <button v-on:click="addProject" class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Add new project</button>
     </div>
  </div>
</template>

<script>
import ProjectService from "../services/project.service";

export default {
  name: "select-project",
  data: function() {
    return {
      selectedProject: '',
      projects: [],

    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showaddProject() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_ADMIN');
      }
      return false;
	}
  },
  methods: {
    addProject() {
      console.log("addProject");
      ProjectService.addProject().then(this.$router.push('/project-settings'));
    },
    SelectProject(e) {
	const id = e.target.value;
    ProjectService.selectProject(id).then(
            () => {
                this.$router.push('/view');
            },
            error => {
              this.loading = false;
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            }
          );
    }
  },
  mounted() {
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
