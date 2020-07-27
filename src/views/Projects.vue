<template>
  <div class="container">
    <header>
      <h3>
        <strong>Projects</strong>
      </h3>
    </header>
    <strong>Select Project</strong>
    <select-project/>
  </div>
</template>
<script>
import SelectProject from "../components/SelectProject";
export default {
  name: 'projects',
  components: {
      SelectProject
  },
  methods: {
      }
};
</script>
