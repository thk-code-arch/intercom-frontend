<!-- // Copyright (c) 2021 Steffen Stein <mail@steffenstein.com> For LICENSE see docs/LICENSE -->

<template>
  <div class="w-full px-4 px-6 sm:px-8">
    <router-link
      to="/about"
      class="absolute bottom-0 right-0 p-2 text-xl text-gray-700"
      >ABOUT</router-link
    >
    <div class="w-3/4 mx-auto">
      <HelloUser />
      <HomeMenu />
    </div>
  </div>
</template>
<script>
import HelloUser from "../components/home/HelloUser";
import HomeMenu from "../components/home/HomeMenu";

export default {
  name: "home",
  components: {
    HelloUser,
    HomeMenu,
  },
  methods: {},
};
</script>
