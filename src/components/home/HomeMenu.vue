<!-- // Copyright (c) 2021 Steffen Stein <mail@steffenstein.com> For LICENSE see docs/LICENSE -->

<template>
  <div class="grid grid-cols-2 gap-2">
    <div
      class="flex flex-col justify-center h-32 m-2 text-center bg-white rounded cursor-pointer"
    >
      Notes
      <router-link to="/profile" />
    </div>
    <div
      class="flex flex-col justify-center h-32 m-2 text-center bg-white rounded cursor-pointer"
    >
      News
      <router-link to="/profile" />
    </div>
    <div
      class="flex flex-col justify-center h-32 m-2 text-center bg-white rounded cursor-pointer"
    >
      Calendar
      <router-link to="/profile" />
    </div>
    <div
      class="flex flex-col justify-center h-32 m-2 text-center bg-white rounded cursor-pointer"
    >
      Profile Settings
      <router-link to="/profile" />
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeMenu",
  components: {},
  computed: {},
  mounted() {},
  data() {
    return {};
  },
  methods: {},
};
</script>
