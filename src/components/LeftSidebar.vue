<template>
<div class="div3">Left Sidebar 
    <p>Test</p>
</div>
</template>

<script>

export default {
  name: "left-sidebar",
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
