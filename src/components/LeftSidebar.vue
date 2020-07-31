<template>
<div class="p-4 h-24">
  <div class="flex-1 flex flex-col bg-white overflow-hidden">
        <!-- Top bar -->
        <div class="border-b flex px-6 py-2 items-center flex-none">
            <div class="flex flex-col">
                <h3 class="text-grey-darkest mb-1 font-extrabold">Issue creation</h3>
                <div class="text-grey-dark text-sm truncate">
                    Lorem ipsum dolor sit amet,Ch
                </div>
            </div>
        </div>
        <!-- TEXT -->
        <div class="flex items-start mb-4 text-sm">
            <div class="flex-1 px-6">
                <p class="text-black leading-normal">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et eagg</p>
            </div>
        </div>
  </div>
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
