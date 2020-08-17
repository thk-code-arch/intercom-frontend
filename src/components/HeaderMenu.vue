<template>
  <header class="flex flex-wrap items-center px-6 px-8 py-0 py-2 bg-white">
    <div class="w-full grid grid-cols-3 gap-4">
  <div class="flex items-start" id="menu">
        <router-link to="/projects" class="px-0 py-3 border-b-2 border-transparent lg:p-4 hover:border-indigo-400"><svg class="inline-block w-5 h-5 text-black align-middle fill-current" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clip-rule="evenodd"></path></svg> Project</router-link>
        <router-link to="/view" v-if="isProjectSelected" class="px-0 py-3 border-b-2 border-transparent lg:p-4 hover:border-indigo-400"><svg class="inline-block w-5 h-5 text-black align-middle fill-current" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"></path></svg> View</router-link>
        <router-link to="/chat" class="px-0 py-3 border-b-2 border-transparent lg:p-4 hover:border-indigo-400"><svg class="inline-block w-5 h-5 text-black align-middle fill-current" viewBox="0 0 20 20"><path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path><path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"></path></svg> Chat</router-link>
        <router-link to="/learning" class="px-0 py-3 border-b-2 border-transparent lg:p-4 hover:border-indigo-400"><svg class="inline-block w-5 h-5 text-black align-middle fill-current" viewBox="0 0 20 20"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path></svg> Learning</router-link>
  </div>
  <div class="flex items-center justify-center" id="menu" >
      <div v-if="isProjectSelected"> {{currentProject.name}}</div>
  </div>
  <div class="flex items-end justify-end" id="menu">
        <router-link to="/project-settings" v-if="isProjectOwner" class="px-0 py-3 border-b-2 border-transparent lg:p-4 hover:border-indigo-400"><svg class="inline-block w-5 h-5 text-black align-middle fill-current" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clip-rule="evenodd"></path></svg> Edit</router-link>
        <router-link to="/admin"  v-if="isAdmin" class="px-0 py-3 border-b-2 border-transparent lg:p-4 hover:border-indigo-400"><svg class="inline-block w-5 h-5 text-black align-middle fill-current" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path></svg> Admin</router-link>
        <router-link to="/profile" class="px-0 py-3 border-b-2 border-transparent tooltip lg:p-4 hover:border-indigo-400">
        <img :src="currentUser.profile_image" class="inline-block w-8 h-8 text-black align-middle rounded-full fill-current tooltip">
          <span v-on:click="logOut()" class='items-center bg-white border-2 rounded tooltip-text'>
            Logout
          </span>
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
      this.$store.dispatch('curproject/unselect');
      this.$store.dispatch('auth/logout');
      this.$store.dispatch('viewport/clear');
      this.$store.dispatch('chatroom/clear');
      this.$store.dispatch('iosockets/close_sockets');
      this.$router.push('/login');
    }
  }
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
.tooltip .tooltip-text {
  visibility: hidden;
  text-align: center;
  padding: 2px 6px;
  right: 22px;
  top: 72px;
  position: relative;
  z-index: 100;
}
.tooltip:hover .tooltip-text {
  visibility: visible;
}
</style>
