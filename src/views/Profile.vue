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
          </div>
        </div>
        <!-- TEXT -->
        <h2 class="mb-2 text-2xl">Change Password</h2>
        <change-password />
      </div>
    </div>
  </div>
</template>

<script>
import ChangePassword from "../components/profile/ChangePassword";
export default {
  name: "Profile",
  components: { ChangePassword },
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
  methods: {},
};
</script>
