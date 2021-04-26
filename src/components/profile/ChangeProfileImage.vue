<template>
  <div class="flex justify-center px-2">
    <div class="p-8 bg-white rounded-lg">
      <!-- Top bar -->
      <div class="flex items-center flex-none py-2 mb-4 border-b">
        <div class="flex flex-col">
          <h2 class="mb-2 text-2xl">Profile</h2>
        </div>
      </div>
      <!-- TEXT -->
      <div class="">
        <img
          :src="currentUser.profile_image"
          class="object-cover w-full h-full"
        />
        <!-- TEXT -->
        <label
          class="flex flex-col inline-block px-3 py-1 mb-2 mr-2 font-semibold text-white bg-gray-800 rounded-full"
        >
          <input type="file" ref="file" @change="selectFile" hidden />
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "change-profile-image",
  data: function () {
    return {
      profile: {},
      content: {},
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  components: {},

  methods: {},
  mounted() {
    this.profile = this.$store.state.auth.user;
  },
};
</script>
