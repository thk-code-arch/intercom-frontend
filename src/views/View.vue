<template>
<div class="h-screen2">
<div class="flex flex-row w-full absolute z-10 nopointer">

<div class="w-full h-screen2">
<vue-splitter>
  <div slot="left-pane" class="bg-gray-200 bg-opacity-50 h-screen2 allpointer">
    <left-sidebar/>
  </div>
  <div slot="right-pane">
    <div class="w-16 h-screen2 allpointer"></div>
  </div>
</vue-splitter>
</div>

<div class="w-full h-screen2 nopointer">
</div>

<div class="w-full h-screen2">
<vue-splitter>
  <div slot="left-pane" class="flex justify-end">
    <div class="w-16 h-screen2 allpointer"></div>
  </div>
  <div slot="right-pane" class="bg-gray-200 bg-opacity-50 h-screen2 allpointer">
    <right-sidebar/>
  </div>
</vue-splitter>
</div>

</div>
    <view-port/>
</div>

</template>

<script>
import VueSplitter from "@rmp135/vue-splitter"
import LeftSidebar from "@/components/view/LeftSidebar";
import RightSidebar from "@/components/view/RightSidebar";
import ViewPort from "@/components/view/ViewPort.vue";

export default {
  name: 'View',
  components: {
	VueSplitter,
      ViewPort,
    LeftSidebar,
    RightSidebar
  }}
</script>
<style>
.allpointer{
  pointer-events: all;
}
.nopointer{
  pointer-events: none;
}
.splitter{
  pointer-events: all;
}
</style>
