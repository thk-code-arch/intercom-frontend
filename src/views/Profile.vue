<template>
  <div class="flex justify-center mx-auto px-4">
    <div class="max-w-6xl bg-white rounded-lg m-8 p-8">
        <!-- Top bar -->
        <div class="border-b flex px-6 py-2 mb-4 items-center flex-none">
            <div class="flex flex-col">
              <h1 class="text-2xl font-medium mb-2"><strong>{{currentUser.username}}</strong> Profile</h1>
                <div class="text-grey-dark text-sm truncate">
                  Details
                </div>
            </div>
        </div>
        <!-- TEXT -->
      <h1 class="text-2xl font-medium mb-2">
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
  </div>
    <div class="max-w-lg bg-white rounded-lg m-8 p-8">
        <!-- Top bar -->
        <div class="border-b flex px-6 py-2 mb-4 items-center flex-none">
            <div class="flex flex-col">
              <h1 class="text-2xl font-medium mb-2">Profile image</h1>
                <div class="text-grey-dark text-sm truncate">
                  Upload Image
                </div>
            </div>
        </div>
        <!-- TEXT -->
      <h1 class="text-2xl font-medium mb-2">
      </h1>
      <img :src="currentUser.profile_image" class="h-64 w-64 m-auto text-black rounded-full">

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
      this.$store.dispatch('curproject/unselect');
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }  }
};
</script>
