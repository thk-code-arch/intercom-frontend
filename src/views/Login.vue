<template>
  <div class="flex md:flex-row-reverse flex-wrap">
    <div class="p-64 flex h-screen w-full md:w-3/4 bg-white p-4 text-center text-gray-200">
        <div class="m-auto">
      <img :src="images.logo">
        </div>
    </div>
      <div class="flex h-screen w-full md:w-1/4 bg-gray-200 p-4 text-center text-gray-700">
        <div class="m-auto">
            <div class="bg-white rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
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
    <p>{{ message.message }}</p>
<FormulateInput label="Login" type="submit" />
  </FormulateForm>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import User from '../models/user';

export default {
  name: 'Login',
  data() {
    return {
      user: new User('', ''),
      loading: false,
      message: '',
      images: {
          logo: require('../assets/logo.png')
      }
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/projects');
    }
  },
  methods: {
    login() {
      this.loading = true;
        if (this.user.username && this.user.password) {
          this.$store.dispatch('auth/login', this.user).then(
            () => {
                this.$router.push('/projects');
            },
            error => {
              this.loading = false;
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            }
          );
        }
    }
  }
};
</script>
