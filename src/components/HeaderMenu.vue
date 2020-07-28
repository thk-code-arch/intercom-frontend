<template>
    <div id="nav">
		<div id="nav-container">
			<div id="left">
			<router-link to="/projects">Projects</router-link> |
			<router-link to="/view">View</router-link> 
			</div>
			<div id="right">
			<router-link to="/project-settings" v-if="projectOwner">Project Settings</router-link>  |
			<router-link to="/profile">User Profile</router-link>  |
			<a href @click.prevent="logOut">LogOut</a>
			</div>
		</div>
    </div>
</template>

<script>

export default {
  name: "header-menu",
  data() {
    return {
    };
  },
  computed: {
    currentProject() {
      console.log(this.$store.state.project);
      return this.$store.state.project;
    },
    projectOwner() {
      if (this.currentProject && this.currentProject.owner) {
        console.log(this.currentProject.owner);
        return true;
      }
      return false;
	}
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }  }
};
</script>
<style>
#nav-container {
    width:100%;
    text-align:center;
}

#left {
    float:left;
    width:100px;
}


#right {
    float:right;
    width:100px;
}
</style>
