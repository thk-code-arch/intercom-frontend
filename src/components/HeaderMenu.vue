<template>
<header id="top" class="flex flex-col w-full">
  <fixed-header>
  <nav id="site-menu" class="z-50 flex flex-col items-center justify-between w-full px-4 py-1 bg-white border-b-2 border-blue-900 navbar sm:flex-row sm:px-6">
    <div class="flex flex-row flex-no-wrap items-center self-start justify-between w-full sm:w-auto sm:self-center sm:flex-none">
        <img class="w-24" :src="images.logo">
      <button id="menuBtn" class="block hamburger sm:hidden focus:outline-none" type="button" onclick="navToggle();">
        <span class="hamburger__top-bun"></span><span class="hamburger__bottom-bun"></span>
      </button>
    </div>
    <div id="menu" class="flex-col items-center self-end hidden w-full h-full py-1 pb-4 sm:w-auto sm:self-center sm:flex sm:flex-row sm:py-0 sm:pb-0">
          <div v-if="isProjectSelected" class="relative">
            <button @click="PisOpen = !PisOpen" class="relative z-10 block h-8 mr-2 overflow-hidden bg-gray-200 rounded-full focus:outline-none focus:border-white">
              <span class="m-3 text-sm">{{currentProject.name}}</span>
            </button>
            <button v-if="PisOpen" @click="PisOpen = false" tabindex="-1" class="fixed inset-0 w-full h-full bg-black opacity-50 cursor-default"></button>
            <div v-if="PisOpen" class="absolute right-0 w-48 py-2 mt-2 bg-white rounded-lg shadow-xl">
                <router-link v-on:click.native="PisOpen = false" to="/project-settings" v-if="isProjectOwner" class="block px-4 py-2 text-gray-800 hover:bg-indigo-400 hover:text-white"><svg class="inline-block w-5 h-5 text-black align-middle fill-current" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clip-rule="evenodd"></path></svg> Edit</router-link>
            </div>
          </div>
          <div class="relative">
            <button @click="isOpen = !isOpen" class="relative z-10 block w-10 h-10 overflow-hidden border-2 border-gray-600 rounded-full focus:outline-none focus:border-white">
                <img :src="currentUser.profile_image" class="object-cover w-full h-full">
            </button>
            <button v-if="isOpen" @click="isOpen = false" tabindex="-1" class="fixed inset-0 w-full h-full bg-black opacity-50 cursor-default"></button>
            <div v-if="isOpen" class="absolute right-0 w-48 py-2 mt-2 bg-white rounded-lg shadow-xl">
              <router-link v-on:click.native="isOpen = false" to="/profile" class="block px-4 py-2 text-gray-800 hover:bg-indigo-400 hover:text-white">Profile settings</router-link>
              <router-link v-on:click.native="isOpen = false" to="/admin"  v-if="isAdmin" class="block px-4 py-2 text-gray-800 hover:bg-indigo-400 hover:text-white"><svg class="inline-block w-5 h-5 text-black align-middle fill-current" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path></svg> Admin</router-link>
              <router-link to="/login" v-on:click.native="logOut()" class="block px-4 py-2 text-gray-800 hover:bg-indigo-400 hover:text-white">Logout</router-link>
            </div>
          </div>
    </div>
  </nav>
</fixed-header>
  <div id="sub-menu" class="flex flex-col items-center justify-between w-full px-4 py-1 text-white bg-blue-900 sm:flex-row sm:px-6">
    <div id="menu" class="flex-col items-center self-end hidden w-full h-full py-1 pb-4 sm:w-auto sm:self-center sm:flex sm:flex-row sm:py-0 sm:pb-0">
      <router-link to="/" class="w-full py-1 border-b-2 border-transparent outline-none lg:p-2 hover:border-indigo-400">
        Home
      </router-link>
      <router-link to="/projects" class="w-full py-1 border-b-2 border-transparent outline-none lg:p-2 hover:border-indigo-400">
        Project</router-link>
      <router-link to="/view" class="w-full py-1 border-b-2 border-transparent outline-none lg:p-2 hover:border-indigo-400" v-if="isProjectSelected" >
        View</router-link>
      <router-link to="/chat" class="w-full py-1 border-b-2 border-transparent outline-none lg:p-2 hover:border-indigo-400">
        Chat</router-link>
      <router-link to="/learning" class="w-full py-1 border-b-2 border-transparent outline-none lg:p-2 hover:border-indigo-400">
        Learning</router-link>
    </div>
    <div class="flex flex-row flex-no-wrap items-center self-start justify-between w-full sm:w-auto sm:self-center sm:flex-none">
      <button id="menuBtn" class="block hamburger sm:hidden focus:outline-none" type="button" onclick="navToggle();">
        <span class="hamburger__top-bun"></span><span class="hamburger__bottom-bun"></span>
      </button>
    </div>
  </div>
</header>
</template>

<script>
import FixedHeader from 'vue-fixed-header'
export default {
  name: "header-menu",
  data() {
    return {
      isOpen: false,
      PisOpen: false,
      images: {
          logo: require('../assets/logo.png')
      }
    };
  },
  components:{
    FixedHeader
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
  },
  created() {
    const handleEscape = (e) => {
      if (e.key === 'Esc' || e.key === 'Escape') {
        this.isOpen = false
      }
    }
    document.addEventListener('keydown', handleEscape)
    this.$once('hook:beforeDestroy', () => {
      document.removeEventListener('keydown', handleEscape)
    })
  }
};
</script>
<style>
.navbar.vue-fixed-header--isFixed {
  position: fixed;
  left: 0;
  top: 0;
}
</style>
