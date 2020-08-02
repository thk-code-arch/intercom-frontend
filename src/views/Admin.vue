<template>
  <div class="px-4">
    <div class="max-w-6xl bg-white rounded-lg mx-auto my-8 p-8">
        <!-- Top bar -->
        <div class="border-b flex px-6 py-2 mb-4 items-center flex-none">
            <div class="flex flex-col">
                <h1 class="text-2xl font-medium mb-2">Admin Dashboard</h1>
                <div class="text-grey-dark text-sm truncate">
                  Admin section
               </div>
            </div>
        </div>
        <!-- TEXT -->
  </div>
  </div>
</template>

<script>
export default {
  name: 'Admin',
  components: {
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  },
 data(){
  return {
    file: ''
  }
 },
};
</script>
