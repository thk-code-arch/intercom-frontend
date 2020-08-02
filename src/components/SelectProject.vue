<template>
  <div>
    <div class="flex content-start flex-wrap justify-center">
      <div class="box-border w-32 h-24 p-3 m-2 text-center border-2 border-black flex items-center justify-center" v-for="project in projects" :key="project.id"  v-on:click="Select(project)"> {{ project.name }} </div>
      <div v-if="showaddProject" v-on:click="addProject" class="box-border w-32 h-24 p-3 m-2 border-solid border-2 border-black flex items-center justify-center"><svg class="h-8 w-8 fill-current text-black inline-block align-middle" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"></path></svg></div>
    </div>
  </div>
</template>

<script>
import ProjectService from "../services/project.service";
import Project from '../models/project';

export default {
  name: "select-project",
  data: function() {
    return {
      project: new Project('', ''),
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
    this.$store.dispatch('curproject/addnewProject').then(
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
    },
    Select: function(project) {
    this.project.id = project.id;
    this.$store.dispatch('curproject/selectProject', this.project).then(
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
