<template>
  <div>
      <h3>{{content}}</h3>
  </div>
</template>

<script>
import ProjectService from "../services/project.service";

export default {
  name: "select-project",
  data() {
    return {
      content: ''
    };
  },
  mounted() {
      ProjectService.getProjects().then(
      response => {
        this.content = response.data;
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
