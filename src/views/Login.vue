<!-- // Copyright (c) 2021 Steffen Stein <mail@steffenstein.com> For LICENSE see docs/LICENSE -->

<template>
  <div class="flex flex-wrap md:flex-row-reverse">
    <div
      class="flex w-full h-screen p-4 text-center text-gray-200 bg-white md:w-3/4"
    >
      <INTERCOM class="p-6" />
    </div>
    <div
      class="flex w-full h-screen p-4 text-center text-gray-700 bg-gray-200 md:w-1/4"
    >
      <div class="m-auto">
        <component v-bind:is="currentTabComponent"></component>
        <div v-for="tab in tabs" v-bind:key="tab">
          <button
            v-if="currentTab != tab.component"
            v-on:click="currentTab = tab.component"
            class="w-full p-1 m-1 border rounded white"
          >
            {{ tab.name }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SignIn from "@/components/login/signin";
import Register from "@/components/login/register";
import ResetPassword from "@/components/login/ResetPassword";
import INTERCOM from "../assets/LOGO_INTERCOM";
export default {
  name: "Login",
  components: {
    SignIn,
    Register,
    ResetPassword,
    INTERCOM,
  },
  data() {
    return {
      currentTab: "SignIn",
      tabs: [
        { name: "Register", component: "Register" },
        { name: "Forgot Password!", component: "ResetPassword" },
        { name: "Sign In", component: "SignIn" },
      ],
    };
  },
  computed: {
    currentTabComponent: function () {
      return this.currentTab;
    },
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/projects");
    }
  },
};
</script>
