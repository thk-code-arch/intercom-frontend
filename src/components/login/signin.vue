<!-- // Copyright (c) 2021 Steffen Stein <mail@steffenstein.com> For LICENSE see docs/LICENSE -->

<template>
  <div class="flex flex-col px-8 pt-6 pb-8 mb-4 bg-white rounded">
    <FormulateForm @submit="login">
      <FormulateInput
        type="text"
        name="username"
        v-model="user.username"
        label="Username"
        validation="required"
      />
      <FormulateInput
        type="password"
        name="password"
        v-model="user.password"
        label="Password"
        validation="required"
      />
      <p class="text-red-500">{{ message.error }}</p>
      <FormulateInput label="Login" type="submit" />
    </FormulateForm>
  </div>
</template>

<script>
import User from "@/models/user";

export default {
  name: "SignIn",
  data() {
    return {
      user: new User("", ""),
      loading: false,
      message: {},
    };
  },
  methods: {
    login() {
      this.loading = true;
      if (this.user.username && this.user.password) {
        this.$store.dispatch("auth/login", this.user).then(
          () => {
            this.$router.push("/projects");
          },
          (error) => {
            this.loading = false;
            this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
          }
        );
      }
    },
  },
};
</script>
