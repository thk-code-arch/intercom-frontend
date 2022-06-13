<!-- // Copyright (c) 2021 Steffen Stein <mail@steffenstein.com> For LICENSE see docs/LICENSE -->

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
        <!-- TEXT -->
        <FormulateForm
          name="UpdateProfile"
          @submit="updateProfileNow"
          v-model="profile"
          :schema="updateProfile"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'update-profile',
  data: function () {
    return {
      profile: {},
      content: {},
      updateProfile: [
        {
          label: 'Username',
          name: 'username',
          validation: 'required',
        },
        {
          label: 'Email',
          name: 'email',
          validation: 'required|email',
        },
        {
          type: 'submit',
          label: 'Save',
        },
      ],
    };
  },
  methods: {
    updateProfileNow() {
      this.$http
        .post('user/update_profile', {
          username: this.profile.username,
          email: this.profile.email,
        })
        .then(
          (response) => {
            this.profile = response.data;
            this.$store.dispatch('auth/updateProfile', response.data);
            this.$notify({
              title: 'Success',
              text: 'Profile updated',
              group: 'info',
            });
          },
          (error) => {
            this.$notify({
              title: 'Ooops...',
              text:
                (error.response && error.response.data) ||
                error.message ||
                error.toString(),
              group: 'error',
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
