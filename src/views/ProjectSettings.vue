<template>
  <div class="container">
    <h3>Project Settings</h3>
    <edit-project/>
  </div>
</template>

<script>
import EditProject from "../components/EditProject";
export default {
  name: 'Project-Settings',
  components: {
    EditProject
  },
 data(){
  return {
    file: ''
  }
 },
};
</script>
