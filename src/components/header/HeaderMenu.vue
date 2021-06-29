<!-- // Copyright (c) 2021 Steffen Stein <mail@steffenstein.com> For LICENSE see docs/LICENSE -->

<template>
  <header id="top" class="flex flex-col w-full">
    <fixed-header>
      <div
        id="top-menu"
        class="flex items-center justify-between w-full px-4 px-6 py-1 bg-white border-b-2 border-blue-900 navbar"
      >
        <div class="self-center">
          <INTERCOM class="w-24" />
        </div>
        <div class="flex">
          <div v-if="isProjectSelected" class="relative">
            <button
              @click="PisOpen = !PisOpen"
              class="relative z-10 flex justify-start block h-10 p-2 mr-2 overflow-hidden bg-gray-200 rounded-full focus:outline-none focus:border-white"
            >
              <span class="m-auto">{{ currentProject.name }}</span>
              <svg
                v-on:click="closeProject()"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="h-5 m-auto x-circle"
                style="--darkreader-inline-fill: currentColor"
                data-darkreader-inline-fill=""
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <button
              v-if="PisOpen && isProjectOwner"
              @click="PisOpen = false"
              tabindex="-1"
              class="fixed inset-0 w-full h-full cursor-default"
            ></button>
            <div
              v-if="PisOpen && isProjectOwner"
              class="absolute right-0 z-40 w-48 py-2 mt-2 bg-white rounded-lg shadow-xl"
            >
              <router-link
                v-on:click.native="PisOpen = false"
                to="/project-settings"
                v-if="isProjectOwner"
                class="block px-4 py-2 text-gray-800 hover:bg-codearch-400 hover:text-white"
                ><svg
                  class="inline-block w-5 h-5 text-black align-middle fill-current"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                Edit</router-link
              >
            </div>
          </div>
          <div class="relative">
            <button
              @click="isOpen = !isOpen"
              class="relative z-10 block w-10 h-10 overflow-hidden border-2 rounded-full border-codearch-500 focus:outline-none focus:border-white"
            >
              <img
                :src="currentUser.profile_image"
                class="object-cover w-full h-full"
              />
            </button>
            <button
              v-if="isOpen"
              @click="isOpen = false"
              tabindex="-1"
              class="fixed inset-0 w-full h-full cursor-default"
            ></button>
            <div
              v-if="isOpen"
              class="absolute right-0 z-40 w-48 py-2 mt-2 bg-white rounded-lg shadow-xl"
            >
              <router-link
                v-on:click.native="isOpen = false"
                to="/profile"
                class="block px-4 py-2 text-gray-800 hover:bg-codearch-400 hover:text-white"
              >
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="inline-block w-5 h-5 text-black align-middle fill-current"
                >
                  <path
                    d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"
                  ></path>
                </svg>
                Profile settings
              </router-link>
              <router-link
                v-on:click.native="isOpen = false"
                to="/admin"
                v-if="isAdmin"
                class="block px-4 py-2 text-gray-800 hover:bg-codearch-400 hover:text-white"
              >
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="inline-block w-5 h-5 text-black align-middle fill-current"
                >
                  <path
                    d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z"
                  ></path>
                </svg>
                Admin
              </router-link>
              <router-link
                to="/login"
                v-on:click.native="logOut()"
                class="block px-4 py-2 text-gray-800 hover:bg-codearch-400 hover:text-white"
              >
                <svg
                  class="inline-block w-5 h-5 text-black align-middle fill-current"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                Logout
              </router-link>
              <div
                v-on:click="clickBugReport()"
                class="w-full px-4 py-2 text-white outline-none cursor-pointer bg-codearch-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="inline-block w-4 h-4 text-white fill-current"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M7.074 1.408c0-.778.641-1.408 1.431-1.408.942 0 1.626.883 1.38 1.776-.093.336-.042.695.138.995.401.664 1.084 1.073 1.977 1.078.88-.004 1.572-.408 1.977-1.078.181-.299.231-.658.138-.995-.246-.892.436-1.776 1.38-1.776.79 0 1.431.63 1.431 1.408 0 .675-.482 1.234-1.118 1.375-.322.071-.6.269-.769.548-.613 1.017.193 1.917.93 2.823-1.21.562-2.524.846-3.969.846-1.468 0-2.771-.277-3.975-.84.748-.92 1.555-1.803.935-2.83-.168-.279-.446-.477-.768-.548-.636-.14-1.118-.699-1.118-1.374zm13.485 14.044h2.387c.583 0 1.054-.464 1.054-1.037s-.472-1.037-1.054-1.037h-2.402c-.575 0-1.137-.393-1.227-1.052-.092-.677.286-1.147.765-1.333l2.231-.866c.541-.21.807-.813.594-1.346-.214-.533-.826-.795-1.367-.584l-2.294.891c-.329.127-.734.036-.926-.401-.185-.423-.396-.816-.62-1.188-1.714.991-3.62 1.501-5.7 1.501-2.113 0-3.995-.498-5.703-1.496-.217.359-.421.738-.601 1.146-.227.514-.646.552-.941.437l-2.295-.89c-.542-.21-1.153.051-1.367.584-.213.533.053 1.136.594 1.346l2.231.866c.496.192.854.694.773 1.274-.106.758-.683 1.111-1.235 1.111h-2.402c-.582 0-1.054.464-1.054 1.037s.472 1.037 1.054 1.037h2.387c.573 0 1.159.372 1.265 1.057.112.728-.228 1.229-.751 1.462l-2.42 1.078c-.53.236-.766.851-.526 1.373s.865.753 1.395.518l2.561-1.14c.307-.137.688-.106.901.259 1.043 1.795 3.143 3.608 6.134 3.941 2.933-.327 5.008-2.076 6.073-3.837.261-.432.628-.514.963-.364l2.561 1.14c.529.236 1.154.005 1.395-.518.24-.522.004-1.137-.526-1.373l-2.42-1.078c-.495-.221-.867-.738-.763-1.383.128-.803.717-1.135 1.276-1.135z"
                  />
                </svg>
                Bug Report
              </div>
            </div>
          </div>
          <BugReport v-if="BugReportisOpen" @exitBugReport="exitBugReport()" />
        </div>
      </div>
    </fixed-header>
    <div
      id="sub-menu"
      class="flex flex-col items-center justify-between w-full px-4 py-1 text-white bg-codearch-700 sm:flex-row sm:px-6"
    >
      <div
        id="menu"
        class="flex-col items-center self-end hidden w-full h-full py-1 pb-4 sm:w-auto sm:self-center sm:flex sm:flex-row sm:py-0 sm:pb-0"
      >
        <router-link
          to="/"
          class="w-full py-1 border-b-2 border-transparent outline-none lg:p-2 hover:border-codearch-400"
          exact-active-class="border-codearch-400"
        >
          Home
        </router-link>
        <router-link
          to="/projects"
          class="w-full py-1 border-b-2 border-transparent outline-none lg:p-2 hover:border-codearch-400"
          active-class="border-codearch-400"
        >
          Project</router-link
        >
        <router-link
          to="/view"
          class="w-full py-1 border-b-2 border-transparent outline-none lg:p-2 hover:border-codearch-400"
          v-if="isProjectSelected"
          active-class="border-codearch-400"
        >
          View</router-link
        >
        <router-link
          to="/chat"
          class="w-full py-1 border-b-2 border-transparent outline-none lg:p-2 hover:border-codearch-400"
          active-class="border-codearch-400"
        >
          Chat</router-link
        >
        <router-link
          to="/learning"
          class="w-full py-1 border-b-2 border-transparent outline-none lg:p-2 hover:border-codearch-400"
          active-class="border-codearch-400"
        >
          Learning</router-link
        >
      </div>
      <div
        class="flex self-end hidden float-right w-full h-full py-1 pb-4 iterms-end sm:w-auto sm:float-right sm:flex sm:py-0 sm:pb-0"
      ></div>
    </div>
  </header>
</template>

<script>
import BugReport from "./maintenance/BugReport";
import FixedHeader from "vue-fixed-header";
import INTERCOM from "../../assets/LOGO_INTERCOM";

export default {
  name: "header-menu",
  data() {
    return {
      isOpen: false,
      PisOpen: false,
      BugReportisOpen: false,
    };
  },
  components: {
    FixedHeader,
    BugReport,
    INTERCOM,
  },
  computed: {
    currentProject() {
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
        return this.currentUser.roles.includes("admin");
      }
      return false;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch("curproject/unselect");
      this.$store.dispatch("auth/logout");
      this.$store.dispatch("viewport/clear");
      this.$store.dispatch("chatroom/clear");
      this.$store.dispatch("iosockets/close_sockets");
      this.$router.push("/login");
    },
    clickBugReport() {
      this.BugReportisOpen = true;
      this.isOpen = false;
    },
    exitBugReport() {
      this.BugReportisOpen = false;
    },
    closeProject() {
      this.$store.dispatch("curproject/unselect");
      this.$store.dispatch("viewport/clear");
      this.$router.push("/projects");
    },
  },
};
</script>

<style>
.navbar.vue-fixed-header--isFixed {
  position: fixed;
  left: 0;
  top: 0;
}
</style>

