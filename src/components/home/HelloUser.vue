<!-- // Copyright (c) 2021 Steffen Stein <mail@steffenstein.com> For LICENSE see docs/LICENSE -->

<template>
  <div class="pt-4 flex-row flex justify-around items-center my-6">
    <h1 class="text-6xl italic tracking-wide text-gray-700">
      hello {{ currentUser.username }}!
    </h1>
    <img
      :src="currentUser.profile_image"
      class="object-cover w-32 border-4 rounded-3xl border-codearch-500"
    />
  </div>
</template>

<script>
export default {
  name: "HelloUser",
  components: {},
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {},
  data() {
    return {};
  },
  methods: {},
};
</script>
