<template>
  <div class="w-full px-4 px-6 mx-auto sm:px-8">
    <HelloUser />
    <HomeMenu />
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
