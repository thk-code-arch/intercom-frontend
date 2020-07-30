<template>
  <header class="px-8 px-6 bg-white flex flex-wrap items-center py-0 py-2">

  <div class="flex items-center w-auto w-full" id="menu">
    <nav>
      <ul class="flex items-center justify-between text-base text-gray-700 pt-4 pt-0">
        <li><router-link to="/projects" class="lg:p-4 py-3 px-0 block border-b-2 border-tranjsparent hover:border-indigo-400"><font-awesome-icon icon="building" /> Project</router-link></li>
        <li><router-link to="/view" class="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400"><font-awesome-icon icon="eye" /> View</router-link></li>
        <li><router-link to="/chat" class="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400"><font-awesome-icon icon="comments" /> Chat</router-link></li>
        <li><router-link to="/learning" class="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400"><font-awesome-icon icon="graduation-cap" /> Learning</router-link></li>
      </ul>
    </nav>

  </div>


  </header>
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
      console.log(this.$store.state.curproject);
      return this.$store.state.curproject;
    },
    isProjectOwner() {
      if (this.currentProject && this.currentProject.owner) {
        console.log(this.currentProject);
        return this.currentProject.owner;
      }
      return false;
	},
    currentUser() {
      return this.$store.state.auth.user;
    },
    isAdmin() {
      if (this.currentUser && this.currentUser.roles) {
        console.log(this.currentUser);
        return this.currentUser.roles.includes('ROLE_ADMIN');
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
}


#right {
    float:right;
}
</style>
