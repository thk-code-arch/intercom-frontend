<template>
  <div>
    <div class="p-8">
      <!-- TEXT -->
      <FormulateForm
        name="ChangePassword"
        @submit="changePasswordNow"
        v-model="password"
        :schema="changePassword"
      />
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
