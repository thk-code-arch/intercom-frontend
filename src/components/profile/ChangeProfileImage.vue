<!-- // Copyright (c) 2021 Steffen Stein <mail@steffenstein.com> For LICENSE see docs/LICENSE -->

<template>
  <div class="flex justify-center px-2">
    <div class="p-8 bg-white rounded-lg">
      <!-- TEXT -->
      <div class="w-48 mt-4">
        <img
          :src="currentUser.profile_image"
          class="object-cover rounded w-full h-full"
        />
        <!-- TEXT -->
        <span class="text-sm text-gray-500 text-center"
          >Upload: Best size 500 * 500 px</span
        >
        <label
          class="flex flex-col inline-block m-2 p-1 font-semibold text-white text-center bg-gray-800 rounded-full"
        >
          <input type="file" ref="file" @change="selectFile" hidden />
          + upload profile image
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

  methods: {
    selectFile() {
      this.selectedFiles = this.$refs.file.files;
      this.upload();
    },
    upload() {
      const fd = new FormData();
      fd.append("file", this.selectedFiles.item(0));
      fd.append("baseUrl", this.$files_url);
      this.$http.post("user/upload_profile_image", fd).then(
        (response) => {
          this.$store.dispatch("auth/updateProfile", response.data);
          this.$notify({
            title: "Success",
            text: "Profile image changed",
            group: "info",
          });
        },
        (error) => {
          this.$notify({
            title: "Ooops...",
            text:
              (error.response && error.response.data) ||
              error.message ||
              error.toString(),
            group: "error",
          });
        }
      );
    },
  },
  mounted() {
    this.profile = this.$store.state.auth.user;
  },
};
</script>
