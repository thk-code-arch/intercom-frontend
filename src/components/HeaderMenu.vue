<template>
  <header class="px-8 px-6 bg-white flex flex-wrap items-center py-0 py-2">
    <div class="grid grid-cols-3 gap-4 w-full">
  <div class="flex items-start" id="menu">
        <router-link to="/projects" class="lg:p-4 py-3 px-0 border-b-2 border-tranjsparent hover:border-indigo-400"><font-awesome-icon icon="building" /> Project</router-link>
        <router-link to="/view" v-if="isProjectSelected" class="lg:p-4 py-3 px-0 border-b-2 border-transparent hover:border-indigo-400"><font-awesome-icon icon="eye" /> View</router-link>
        <router-link to="/chat" class="lg:p-4 py-3 px-0 border-b-2 border-transparent hover:border-indigo-400"><font-awesome-icon icon="comments" /> Chat</router-link>
        <router-link to="/learning" class="lg:p-4 py-3 px-0 border-b-2 border-transparent hover:border-indigo-400"><font-awesome-icon icon="graduation-cap" /> Learning</router-link>
  </div>
  <div class="flex items-center justify-center" id="menu" >
      <div v-if="isProjectSelected"> {{currentProject.name}}</div>
  </div>
  <div class="flex items-end justify-end" id="menu">
        <router-link to="/project-settings" v-if="isProjectOwner" class="lg:p-4 py-3 px-0 border-b-2 border-transparent hover:border-indigo-400"><font-awesome-icon icon="building" /> Edit</router-link>
        <router-link to="/admin"  v-if="isAdmin" class="lg:p-4 py-3 px-0 border-b-2 border-transparent hover:border-indigo-400"><font-awesome-icon icon="lock" /> Admin</router-link>
        <router-link to="/profile" class="lg:p-4 py-3 px-0 border-b-2 border-transparent hover:border-indigo-400">
          <svg class="h-6 w-6 fill-current text-black inline-block align-middle" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path></svg>
        </router-link>
  </div>
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
      console.log(this.$store.state.curproject.theproject);
      return this.$store.state.curproject.theproject;
    },
    isProjectOwner() {
      if (this.currentProject && this.currentProject.owner) {
        return this.currentProject.owner;
      }
      return false;
	},
    isProjectSelected() {
      if (this.currentProject) {
        return this.currentProject.id;
      }
      return false;
	},
    currentUser() {
      return this.$store.state.auth.user;
    },
    isAdmin() {
      if (this.currentUser && this.currentUser.roles) {
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
