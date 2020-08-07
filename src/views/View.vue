<template>
<div class="h-screen2">
    <left-sidebar/>
    <right-sidebar :camPos="camPos"/>
    <view-port @camPosUpdate="camPos"/>
</div>

</template>
<script>
import LeftSidebar from "@/components/view/LeftSidebar";
import RightSidebar from "@/components/view/RightSidebar";
import ViewPort from "@/components/view/ViewPort.vue";

export default {
  name: 'View',
  components: {
      ViewPort,
    LeftSidebar,
    RightSidebar
  },
  data() {
      return {
          camPos: '',
      }
  },
}
</script>

<style>
</style>
