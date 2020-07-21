<template>
  <div class="container">
    <header>
      <h3>
        <strong>Projects</strong>
      </h3>
    </header>
    <strong>Select Project</strong>
    <ul>
      <li v-for="(project,index) in currentUser.projects" :key="index">{{project}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'projects',
  components: {
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  },
 data(){
  return {
    file: ''
  }
 },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }  }
};
</script>
