<template>
  <div class="flex md:flex-row-reverse flex-wrap">
    <div class="p-64 flex h-screen w-full md:w-3/4 bg-white p-4 text-center text-gray-200">
        <div class="m-auto">
      <img :src="images.logo">
        </div>
    </div>
      <div class="flex h-screen w-full md:w-1/4 bg-gray-200 p-4 text-center text-gray-700">
        <div class="m-auto">
        <h3>user: admin / demo </h3>
          <form name="form" @submit.prevent="handleLogin">
            <div class="form-group">
              <label for="username">Username</label>
              <input
                v-model="user.username"
                v-validate="'required'"
                type="text"
                class="form-control"
                name="username"
              />
              <div
                v-if="errors.has('username')"
                class="alert alert-danger"
                role="alert"
              >Username is required!</div>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                v-model="user.password"
                v-validate="'required'"
                type="password"
                class="form-control"
                name="password"
              />
              <div
                v-if="errors.has('password')"
                class="alert alert-danger"
                role="alert"
              >Password is required!</div>
            </div>
            <div class="form-group">
              <button class="btn btn-primary btn-block" :disabled="loading">
                <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                <span>Login</span>
              </button>
            </div>
            <div class="form-group">
              <div v-if="message" class="alert alert-danger" role="alert">{{message}}</div>
            </div>
        </form>
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
    handleLogin() {
      this.loading = true;
      this.$validator.validateAll().then(isValid => {
        if (!isValid) {
          this.loading = false;
          return;
        }

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
      });
    }
  }
};
</script>
