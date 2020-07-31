<template>
  <div class="px-4">
    <div class="max-w-3xl bg-white rounded-lg mx-auto my-16 p-16">
      <h1 class="text-2xl font-medium mb-2">
        <strong>{{currentUser.username}}</strong> Profile
      </h1>

      <h2 class="font-medium text-sm text-indigo-400 mb-4 uppercase tracking-wide">Data</h2>
      <h3>
        <a href @click.prevent="logOut">Logout</a>
      </h3>
    <p>
      <strong>Token:</strong>
      {{currentUser.accessToken.substring(0, 20)}} ... {{currentUser.accessToken.substr(currentUser.accessToken.length - 20)}}
    </p>
    <p>
      <strong>Id:</strong>
      {{currentUser.id}}
    </p>
    <p>
      <strong>Email:</strong>
      {{currentUser.email}}
    </p>
    <strong>Authorities:</strong>
    <ul>
      <li v-for="(role,index) in currentUser.roles" :key="index">{{role}}</li>
    </ul>
    <strong>Projects:</strong>
    <ul>
      <li v-for="(project,index) in currentUser.projects" :key="index">{{project}}</li>
    </ul>
      <upload-files></upload-files>
    </div>
  </div>
</template>

<script>
import UploadFiles from "../components/UploadFiles";
export default {
  name: 'Profile',
  components: {
      UploadFiles
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
