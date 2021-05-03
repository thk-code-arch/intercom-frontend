<template>
  <div class="w-full px-4 px-6 sm:px-8">
    <div class="w-3/4 mx-auto">
      <HelloUser />
      <HomeMenu />
    </div>
    <div class="flex flex-row justify-end w-full my-2">
      <router-link to="/about" class="text-xl text-gray-900">ABOUT</router-link>
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
