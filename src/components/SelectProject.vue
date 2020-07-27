<template>
  <div>
    <select name="projectSelect" v-model="selectedProject" @change="SelectProject">
      <option v-for="project in projects" :key="project.id" v-bind:value="project.id"> {{ project.name }} </option>
    </select>
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
  methods: {
    SelectProject(e) {
	const val = e.target.value
	console.log(val)
    //TODO api selectproject & set localStorage
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
