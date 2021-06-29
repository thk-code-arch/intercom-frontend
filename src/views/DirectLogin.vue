<!-- // Copyright (c) 2021 Steffen Stein <mail@steffenstein.com> For LICENSE see docs/LICENSE -->

<template>
  <div class="w-full h-full">
    Auto login requested ...
    <INTERCOM class="p-12" />
  </div>
</template>

<script>
import INTERCOM from "../assets/LOGO_INTERCOM";
export default {
  name: "DirectLogin",
  components: {
    INTERCOM,
  },
  data() {
    return {};
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    this.login();
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/projects");
    }
  },
  methods: {
    login() {
      this.$store
        .dispatch("auth/login", {
          username: this.$route.params.user,
          password: this.$route.params.pass,
        })
        .then(
          () => {
            this.$router.push("/projects");
          },
          (error) => {
            this.$router.push("/login");
            this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
          }
        );
    },
  },
};
</script>
