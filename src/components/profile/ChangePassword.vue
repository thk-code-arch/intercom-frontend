<!-- // Copyright (c) 2021 Steffen Stein <mail@steffenstein.com> For LICENSE see docs/LICENSE -->

<template>
  <div class="flex justify-center px-2">
    <div class="p-8 bg-white rounded-lg">
      <!-- Top bar -->
      <div class="flex items-center flex-none py-2 mb-4 border-b">
        <div class="flex flex-col">
          <h2 class="mb-2 text-2xl">Change Password</h2>
        </div>
      </div>
      <!-- TEXT -->
      <div class="">
        <!-- TEXT -->
        <FormulateForm
          name="ChangePassword"
          @submit="changePasswordNow"
          v-model="password"
          :schema="changePassword"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "change-password",
  data: function () {
    return {
      password: {},
      content: {},
      changePassword: [
        {
          label: "New password",
          name: "password",
          type: "password",
          validation: "required",
        },
        {
          label: "Confirm password",
          name: "Passwords",
          type: "password",
        },
        {
          type: "submit",
          label: "Update Password",
        },
      ],
    };
  },
  computed: {},
  components: {},

  methods: {
    changePasswordNow() {
      this.$http
        .post("user/update_password", { newPassword: this.password.Passwords })
        .then(
          () => {
            this.$notify({
              title: "Success",
              text: "Password changed",
              group: "info",
            });
            this.$formulate.reset("ChangePassword");
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
  mounted() {},
};
</script>
