<template>
    <div class="pt-4">
        <h1 class="text-xl">hello {{currentUser.username}}!</h1>
    </div>
</template>

<script>
export default {
  name: 'HelloUser',
  components: {
      
  },
  computed: {

          currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
  },
 data(){
  return {
  }
 },
  methods: {
     }
};
</script>