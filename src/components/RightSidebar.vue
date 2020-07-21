<template>
<div class="div4">Right Sidebar 
    <p>Test</p>
</div>
</template>

<script>

export default {
  name: "right-sidebar",
  data() {
    return {
    };
  },
computed: {
 hide () {
   return this.$route.path === '/login' || this.$route.path === '/register'; 
 }
}
};
</script>
