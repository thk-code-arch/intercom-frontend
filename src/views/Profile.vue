<template>
  <div class="container px-4 mx-auto sm:px-8">
    <div class="flex justify-center px-4 mx-auto">
      <div class="max-w-6xl p-8 m-8 bg-white rounded-lg">
        <!-- Top bar -->
        <div class="flex items-center flex-none px-6 py-2 mb-4 border-b">
          <div class="flex flex-col">
            <h1 class="mb-2 text-2xl font-medium">
              <strong>{{ currentUser.username }}</strong> Profile
            </h1>
            <div class="text-sm truncate text-grey-dark">Details</div>
          </div>
        </div>
        <!-- TEXT -->
        <h1 class="mb-2 text-2xl font-medium"></h1>

        <h2
          class="mb-4 text-sm font-medium tracking-wide text-indigo-400 uppercase"
        >
          Data
        </h2>
        <h3>
          <a href @click.prevent="logOut">Logout</a>
        </h3>
        <p>
          <strong>Token:</strong>
          {{ currentUser.accessToken }}
        </p>
        <p>
          <strong>Id:</strong>
          {{ currentUser.id }}
        </p>
        <p>
          <strong>Email:</strong>
          {{ currentUser.email }}
        </p>
        <strong>Authorities:</strong>
        <ul>
          <li v-for="(role, index) in currentUser.roles" :key="index">
            {{ role }}
          </li>
        </ul>
        <strong>Projects:</strong>
        <ul>
          <li v-for="(project, index) in currentUser.projects" :key="index">
            {{ project }}
          </li>
        </ul>
      </div>
      <div class="max-w-lg p-8 m-8 bg-white rounded-lg">
        <!-- Top bar -->
        <div class="flex items-center flex-none px-6 py-2 mb-4 border-b">
          <div class="flex flex-col">
            <h1 class="mb-2 text-2xl font-medium">Profile image</h1>
            <div class="text-sm truncate text-grey-dark">Upload Image</div>
          </div>
        </div>
        <!-- TEXT -->
        <h1 class="mb-2 text-2xl font-medium"></h1>
        <img
          :src="currentUser.profile_image"
          class="w-64 h-64 m-auto text-black rounded-full"
        />

        <upload-files></upload-files>
      </div>
    </div>
  </div>
</template>

<script>
import UploadFiles from "../components/UploadFiles";
export default {
  name: "Profile",
  components: {
    UploadFiles,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
  data() {
    return {
      file: "",
    };
  },
  methods: {
    logOut() {
      this.$store.dispatch("curproject/unselect");
      this.$store.dispatch("auth/logout");
      this.$store.dispatch("viewport/clear");
      this.$store.dispatch("chatroom/clear");
      this.$router.push("/login");
    },
  },
};
</script>
