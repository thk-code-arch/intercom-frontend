<template>
  <div>
    <div class="p-8">
      <!-- TEXT -->
      <FormulateForm
        @submit="changePasswordNow"
        v-model="password"
        :schema="changePassword"
      />
      {{ content }}
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
      console.log("helllo", this.password);
      this.$http
        .post("user/update_password", { newPassword: this.password.Passwords })
        .then(
          (response) => {
            this.content = response.data;
          },
          (error) => {
            this.content =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
          }
        );
    },
  },
  mounted() {},
};
</script>
