<!-- // Copyright (c) 2021 Steffen Stein <mail@steffenstein.com> For LICENSE see docs/LICENSE -->

<template>
  <div class="flex flex-col px-8 pt-6 pb-8 mb-4 bg-white rounded">
    <p class="text-codearch-500">{{ useraction }}</p>
    <FormulateForm v-if="!login" @submit="resetPassword">
      <FormulateInput
        type="text"
        name="email"
        v-model="user.email"
        label="Email"
        validation="required"
      />
      <FormulateInput label="Reset Password" type="submit" />
    </FormulateForm>
    <FormulateForm v-if="login" @submit="loginme">
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
      <FormulateInput label="Login" type="submit" />
    </FormulateForm>
    <p>{{ message.message }}</p>
  </div>
</template>

<script>
import User from "@/models/user";
import AuthService from "@/services/auth.service";

export default {
  name: "PasswordReset",
  data() {
    return {
      user: new User("", "", ""),
      loading: false,
      message: "",
      useraction: "",
      login: false,
    };
  },
  methods: {
    resetPassword() {
      this.message = "";
      this.submitted = true;
      AuthService.resetPassword(this.user).then(
        (response) => {
          this.useraction = response.data;
          this.login = true;
        },
        (error) => {
          this.message =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
          this.successful = false;
        }
      );
    },
    loginme() {
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
