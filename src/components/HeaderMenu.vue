<template>
  <header class="px-8 px-6 bg-white flex flex-wrap items-center py-0 py-2">
    <div class="grid grid-cols-3 gap-4 w-full">
  <div class="flex items-start" id="menu">
        <router-link to="/projects" class="lg:p-4 py-3 px-0 border-b-2 border-tranjsparent hover:border-indigo-400"><svg class="h-5 w-5 fill-current text-black inline-block align-middle" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clip-rule="evenodd"></path></svg> Project</router-link>
        <router-link to="/view" v-if="isProjectSelected" class="lg:p-4 py-3 px-0 border-b-2 border-transparent hover:border-indigo-400"><svg class="h-5 w-5 fill-current text-black inline-block align-middle" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"></path></svg> View</router-link>
        <router-link to="/chat" class="lg:p-4 py-3 px-0 border-b-2 border-transparent hover:border-indigo-400"><svg class="h-5 w-5 fill-current text-black inline-block align-middle" viewBox="0 0 20 20"><path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path><path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"></path></svg> Chat</router-link>
        <router-link to="/learning" class="lg:p-4 py-3 px-0 border-b-2 border-transparent hover:border-indigo-400"><svg class="h-5 w-5 fill-current text-black inline-block align-middle" viewBox="0 0 20 20"><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"></path></svg> Learning</router-link>
  </div>
  <div class="flex items-center justify-center" id="menu" >
      <div v-if="isProjectSelected"> {{currentProject.name}}</div>
  </div>
  <div class="flex items-end justify-end" id="menu">
        <router-link to="/project-settings" v-if="isProjectOwner" class="lg:p-4 py-3 px-0 border-b-2 border-transparent hover:border-indigo-400"><svg class="h-5 w-5 fill-current text-black inline-block align-middle" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clip-rule="evenodd"></path></svg> Edit</router-link>
        <router-link to="/admin"  v-if="isAdmin" class="lg:p-4 py-3 px-0 border-b-2 border-transparent hover:border-indigo-400"><svg class="h-5 w-5 fill-current text-black inline-block align-middle" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path></svg> Admin</router-link>
        <router-link to="/profile" class="lg:p-4 py-3 px-0 border-b-2 border-transparent hover:border-indigo-400">
          <svg class="h-5 w-5 fill-current text-black inline-block align-middle" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path></svg>
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
